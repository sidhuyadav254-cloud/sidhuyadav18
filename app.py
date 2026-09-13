from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_weather

app = Flask(__name__)
CORS(app)

PANCHAYATS = {
    "A": {
        "name": "Panchayat A", "elevation": 420, "slope": 2.0,
        "ndvi": 0.65, "distance_water": 5, "humidity": 72
    },
    "B": {
        "name": "Panchayat B", "elevation": 450, "slope": 3.0,
        "ndvi": 0.60, "distance_water": 8, "humidity": 70
    },
    "C": {
        "name": "Panchayat C", "elevation": 500, "slope": 5.0,
        "ndvi": 0.55, "distance_water": 12, "humidity": 68
    },
    "D": {
        "name": "Panchayat D", "elevation": 390, "slope": 1.5,
        "ndvi": 0.70, "distance_water": 4, "humidity": 75
    }
}

@app.get("/")
def home():
    return jsonify({
        "message": "SIH26074 Panchayat Weather AI API is running"
    })

@app.get("/health")
def health():
    return jsonify({"status": "healthy"})

@app.get("/predict")
def predict():
    code = request.args.get("panchayat", "A").upper()

    if code not in PANCHAYATS:
        return jsonify({"error": "Invalid Panchayat. Use A, B, C or D."}), 400

    p = PANCHAYATS[code]

    # Demo block-level forecast and historical data.
    # Replace these with real IMD/local data in the final system.
    block_rainfall = 20.0
    block_temperature = 30.0
    historical_rainfall = 18.0

    values = {
        "block_rainfall": block_rainfall,
        "block_temperature": block_temperature,
        "elevation": p["elevation"],
        "slope": p["slope"],
        "ndvi": p["ndvi"],
        "distance_water": p["distance_water"],
        "humidity": p["humidity"],
        "historical_rainfall": historical_rainfall
    }

    rainfall, temperature = predict_weather(values)

    # Demo confidence indicator. In a real project calculate
    # confidence/uncertainty from validation or prediction intervals.
    confidence = max(50, min(95, 90 - abs(rainfall - block_rainfall) * 1.5))

    return jsonify({
        "panchayat": p["name"],
        "rainfall_mm": round(rainfall, 2),
        "temperature_c": round(temperature, 2),
        "humidity_percent": p["humidity"],
        "confidence_percent": round(confidence, 1),
        "method": "Random Forest AI downscaling",
        "note": "Demo model trained on sample data"
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)