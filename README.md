###🚘 License Plate Recognition System (Indonesia)

This repository contains a complete License Plate Recognition (LPR) system built with a Next.js dashboard front-end and machine learning training notebooks for OCR and detection models.
The system is designed to detect and recognize Indonesian license plates.

###🔧 Features

📟 Next.js Dashboard for running inference

🤖 Training Notebooks for building and evaluating OCR/detection models

📂 Preprocessed dataset and scripts

🇮🇩 Optimized for Indonesian license plates

⚡ Fast local inference workflow

📦 Dataset

This project uses the Indonesian License Plate Dataset created by Juan Thomas Wijaya.

📌 Dataset link:
https://www.kaggle.com/datasets/juanthomaswijaya/indonesian-license-plate-dataset

✔️ Attribution

This dataset is NOT owned by this repository's authors.
Full credit to Juan Thomas Wijaya as the dataset creator and uploader on Kaggle.

🖥️ Running the Dashboard (Front-End)

Navigate into the dashboard directory:

cd lpr-dashboard


Install dependencies:

npm install


Run the development server:

npm run dev


Visit the app at:

http://localhost:3000

🧠 Model Training (Notebooks)

All training code is located in the notebooks/ directory.

Inside you will find:

🔍 Detection training notebook

🔤 OCR / character recognition training

🧪 Evaluation and preprocessing modules

Use any Python environment or Google Colab to run them.

📁 Project Structure
.
├── lpr-dashboard/          # Next.js dashboard (client-facing app)
├── notebooks/              # Training notebooks (ML models)
├── models/                 # Saved models (if included)
├── README.md               # Project documentation
└── ...

⚖️ License & Attribution Notice

This project may include or reference external datasets and libraries.

The Indonesian License Plate Dataset belongs to its creator
Juan Thomas Wijaya, and attribution is mandatory when using it.

Please follow any dataset licensing rules stated on Kaggle.

⭐ Acknowledgements

Special thanks to:

Juan Thomas Wijaya for providing the dataset

Contributors and collaborators

Open-source libraries such as Next.js, TensorFlow/PyTorch, and others
