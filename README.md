# SIH26074 - Panchayat Weather AI

## Problem
SIH26074 focuses on downscaling weather forecasts from Block level to Panchayat level for agro-meteorological advisory services.

## Proposed Solution
Our system takes coarse Block-level weather information and combines it with local geographical and historical features. A machine-learning model generates a finer Panchayat-level prediction.

### Main Features
- AI/ML weather downscaling
- Panchayat-level rainfall and temperature prediction
- Terrain/elevation and NDVI-related inputs
- Confidence indicator
- Accuracy comparison framework
- Weather alerts
- Crop advisory
- Farmer feedback
- Frontend + Python Flask API

## Project Structure
```text
SIH26074-Panchayat-Weather-AI/
├── frontend/
│   ├── index.html
│   ├── alerts.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── train_model.py
│   ├── requirements.txt
│   ├── data/
│   │   └── weather_data.csv
│   └── model/
│       └── weather_model.pkl   # generated after training
├── README.md
└── .gitignore
```

## Important
The included CSV contains **sample/demo data** only. It is not real IMD forecast data and should not be presented to judges as real-world accuracy.

For the final SIH solution, replace the sample data with suitable real historical observations, forecast variables and Panchayat/local observations, and perform proper train/test validation.

## How to Run

### 1. Open Command Prompt
Go to the backend folder:
```bash
cd SIH26074-Panchayat-Weather-AI\backend
```

### 2. Install Python packages
```bash
pip install -r requirements.txt
```

### 3. Train the ML model
```bash
python train_model.py
```

You should see:
```text
Model trained successfully.
```

### 4. Start Flask
```bash
python app.py
```

The API will run at:
```text
http://127.0.0.1:5000
```

### 5. Open frontend
Use VS Code Live Server and open:
```text
frontend/index.html
```

Then select Panchayat A/B/C/D and click **Get AI Prediction**.

## API Example
```text
GET http://127.0.0.1:5000/predict?panchayat=A
```

The API returns rainfall, temperature, humidity and confidence.

## Future Improvements
- Real IMD forecast data
- Automatic satellite/NDVI data
- Digital elevation model
- Local AWS/weather station observations
- Real-time weather alerts
- Panchayat GIS map
- Telugu/Hindi/English support
- Model accuracy metrics such as MAE/RMSE
- Historical validation against actual observations
- Crop and growth-stage specific advisory
