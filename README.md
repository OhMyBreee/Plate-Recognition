# 🚘 License Plate Recognition System (Indonesia)

This repository contains a complete **License Plate Recognition (LPR)** system built with a **Next.js dashboard** for inference and **machine learning training notebooks** for OCR and object detection.  
The system is designed specifically to detect and recognize **Indonesian license plates**.

---

## 🔧 Features

- 📟 **Next.js Dashboard** for running inference  
- 🤖 **Training Notebooks** for OCR and detection models  
- 📂 **Preprocessed dataset & scripts**  
- 🇮🇩 **Optimized for Indonesian license plates**  
- ⚡ **Fast local inference workflow**

---

## 📦 Dataset

This project uses the **Indonesian License Plate Dataset** created by **Juan Thomas Wijaya**.

📌 **Dataset Link:**  
https://www.kaggle.com/datasets/juanthomaswijaya/indonesian-license-plate-dataset

### ✔️ Frontend Link 
https://github.com/OhMyBreee/LPR-Recogniton-Frontend/

---

## 🖥️ Running the API (Back-End)

Navigate into the dashboard folder:

```bash
cd lpr-api
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the development server:
```bash
uvicorn app:app --reload
```


🧠 Model Training (Notebooks)

All training-related code is in the notebooks/ directory. It includes:

🔍 Detection training notebook

🔤 OCR / character recognition training

🧪 Evaluation & preprocessing modules

You may use any Python environment or Google Colab to run them.

📁 Project Structure
```bash
.
├── lpr-api/            # FAST API based inference
├── notebooks/          # ML training notebooks
├── models/             # Saved models (optional)
├── README.md           # Project documentation
└── ...
```


⚖️ License & Attribution Notice

This project may include or reference external datasets and libraries.
The Indonesian License Plate Dataset belongs to its creator Juan Thomas Wijaya, and attribution is mandatory when using it.

Please comply with any dataset licensing rules stated on Kaggle.

⭐ Acknowledgements

Juan Thomas Wijaya — creator of the dataset

Contributors and collaborators

n-Alan777 - Contributed to the implementation of the FASTAPI for inference and database

Open-source frameworks including Next.js , PyTorch, and others
