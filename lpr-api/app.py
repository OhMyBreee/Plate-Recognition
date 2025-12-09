import time
from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image
import io
import cv2
import numpy as np
from ultralytics import YOLO
from pydantic import BaseModel, Field
import torch
from fastapi.middleware.cors import CORSMiddleware

# --- KONFIGURASI MODEL & JALUR ---
PLATE_DETECTOR_PATH = "../notebooks/models/LPR_MODEL.pt" 
CHAR_RECOGNIZER_PATH = "../notebooks/models/OCR_MODEL.pt"

# --- 36 CLASS NAMES (0-9, A-Z) ---
CLASS_NAMES = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

# --- Pydantic Model untuk Response API (DITAMBAH KOORDINAT) ---
class BoundingBox(BaseModel):
    x1: int
    y1: int
    x2: int
    y2: int
    label: str = Field(None, description="Label for character box only")

class RecognitionResult(BaseModel):
    status: str
    plate_number: str
    time_taken_ms: float
    model_used: str
    plate_box: BoundingBox | None = None  # Bounding Box Plat di gambar asli
    char_boxes: list[BoundingBox] = Field(default_factory=list) # Bounding Box Karakter (relative terhadap plat crop)
    
    class Config:
        schema_extra = {
            "example": {
                "status": "success",
                "plate_number": "B1234ABC",
                "time_taken_ms": 125.75,
                "model_used": "YOLOv8 Dual Stage",
                "plate_box": {"x1": 50, "y1": 100, "x2": 450, "y2": 250, "label": "license_plate"},
                "char_boxes": [
                    {"x1": 5, "y1": 5, "x2": 45, "y2": 95, "label": "B"}, 
                    # ... karakter lainnya
                ]
            }
        }

app = FastAPI()

# --- BLOK CORS (Pastikan ini ada) ---
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --- AKHIR BLOK CORS ---

plate_detector = None
char_recognizer = None

# --- FUNGSI UTILITY ---

def sort_boxes_left_to_right(boxes):
    # Logika sorting boxes tetap sama
    if len(boxes) == 0:
        return []
    
    x_coords = [(box.xyxy[0][0].item(), box) for box in boxes]
    sorted_boxes = [box for _, box in sorted(x_coords, key=lambda x: x[0])]
    return sorted_boxes

# --- MUAT MODEL SAAT SERVER DIMULAI ---
@app.on_event("startup")
def load_models():
    global plate_detector, char_recognizer
    print("Loading Detection and Character Recognition models...")
    plate_detector = YOLO(PLATE_DETECTOR_PATH)
    char_recognizer = YOLO(CHAR_RECOGNIZER_PATH)
    print("✅ Models loaded successfully!")

# --- ENDPOINT INFERENSI UTAMA ---
@app.post("/recognize", response_model=RecognitionResult)
async def recognize_plate_endpoint(file: UploadFile = File(...)):
    start_time = time.time()
    recognized_text = "Plate Not Found"
    plate_box_result = None
    char_boxes_result = []
    
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img_cv2 = np.array(image)
    img_cv2 = cv2.cvtColor(img_cv2, cv2.COLOR_RGB2BGR)
    
    # Simpan dimensi gambar asli
    img_width = image.width
    img_height = image.height

    # [2. Deteksi Plat (YOLO 1)]
    plate_results = plate_detector.predict(img_cv2, conf=0.5, max_det=1, verbose=False)
    
    if plate_results and len(plate_results[0].boxes) > 0:
        # Ambil Bounding Box terbaik
        box_tensor = plate_results[0].boxes.xyxy.cpu().numpy()[0]
        x1, y1, x2, y2 = map(int, box_tensor[:4])

        # Simpan koordinat plat di gambar asli
        plate_box_result = BoundingBox(x1=x1, y1=y1, x2=x2, y2=y2, label="license_plate")
        
        # [3. Cropping Plat]
        h, w, _ = img_cv2.shape
        x1_crop, y1_crop = max(0, x1), max(0, y1)
        x2_crop, y2_crop = min(w, x2), min(h, y2)
        plate_crop = img_cv2[y1_crop:y2_crop, x1_crop:x2_crop]
        
        if plate_crop.size > 0:
            
            # [4. Deteksi Karakter (YOLO 2)]
            char_results = char_recognizer.predict(plate_crop, conf=0.25, verbose=False) 
            
            if len(char_results[0].boxes) > 0:
                # [5. Sorting Karakter dan Menggabungkan Teks]
                sorted_boxes = sort_boxes_left_to_right(char_results[0].boxes)
                
                recognized_chars = []
                for box in sorted_boxes:
                    cls_id = int(box.cls[0].item())
                    char_label = CLASS_NAMES[cls_id]
                    recognized_chars.append(char_label)
                    
                    # Ambil koordinat karakter (relative terhadap plate_crop)
                    char_coords = box.xyxy.cpu().numpy()[0]
                    cx1, cy1, cx2, cy2 = map(int, char_coords[:4])

                    # Tambahkan ke daftar char_boxes
                    char_boxes_result.append(BoundingBox(
                        x1=cx1, y1=cy1, x2=cx2, y2=cy2, label=char_label
                    ))

                recognized_text = ''.join(recognized_chars)
    
    # 6. Stop timer
    end_time = time.time()
    time_taken_ms = round((end_time - start_time) * 1000, 2)

    # [7. Kembalikan Hasil LENGKAP]
    return RecognitionResult(
        status="success",
        plate_number=recognized_text,
        time_taken_ms=time_taken_ms,
        model_used="YOLOv8 Dual Stage",
        plate_box=plate_box_result,
        char_boxes=char_boxes_result
    )