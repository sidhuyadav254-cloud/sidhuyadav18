import os
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_FILE = os.path.join(BASE_DIR, "model", "weather_model.pkl")

if not os.path.exists(MODEL_FILE):
    raise FileNotFoundError(
        "Model not found. Run: python train_model.py"
    )

saved = joblib.load(MODEL_FILE)
model = saved["model"]
features = saved["features"]

def predict_weather(values):
    row = np.array([[values[f] for f in features]])
    prediction = model.predict(row)[0]
    return float(prediction[0]), float(prediction[1])