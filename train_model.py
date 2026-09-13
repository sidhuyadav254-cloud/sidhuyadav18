import os
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "weather_data.csv")
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_FILE = os.path.join(MODEL_DIR, "weather_model.pkl")

df = pd.read_csv(DATA_FILE)

features = [
    "block_rainfall", "block_temperature", "elevation", "slope",
    "ndvi", "distance_water", "humidity", "historical_rainfall"
]

targets = ["panchayat_rainfall", "panchayat_temperature"]

X = df[features]
y = df[targets]

model = MultiOutputRegressor(
    RandomForestRegressor(n_estimators=150, random_state=42)
)
model.fit(X, y)

os.makedirs(MODEL_DIR, exist_ok=True)
joblib.dump({"model": model, "features": features}, MODEL_FILE)

print("Model trained successfully.")
print("Saved to:", MODEL_FILE)