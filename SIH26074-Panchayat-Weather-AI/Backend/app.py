from flask import Flask, request, jsonify

from flask_cors import CORS

import pickle

import os


# ==========================================
# FLASK APP
# ==========================================

app = Flask(__name__)

CORS(app)


# ==========================================
# LOAD ML MODEL
# ==========================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model.pkl"
)


with open(
    MODEL_PATH,
    "rb"
) as file:

    model = pickle.load(file)


# ==========================================
# HOME
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "message":
        "Panchayat Weather AI Backend Running",

        "status":
        "success"

    })


# ==========================================
# WEATHER API
# ==========================================

@app.route("/weather", methods=["GET"])
def weather():

    latitude = request.args.get(
        "lat"
    )

    longitude = request.args.get(
        "lon"
    )


    # Demo weather values.
    # Replace this section with
    # OpenWeatherMap / IMD / another
    # trusted weather API later.

    weather_data = {

        "latitude": latitude,

        "longitude": longitude,

        "temperature": 32,

        "humidity": 65,

        "rain_probability": 35,

        "wind_speed": 12

    }


    return jsonify(
        weather_data
    )


# ==========================================
# AI PREDICTION
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()


        temperature = float(
            data["temperature"]
        )


        humidity = float(
            data["humidity"]
        )


        wind_speed = float(
            data["wind_speed"]
        )


        cloud_cover = float(
            data["cloud_cover"]
        )


        features = [[

            temperature,

            humidity,

            wind_speed,

            cloud_cover

        ]]


        prediction = model.predict(
            features
        )[0]


        probability = model.predict_proba(
            features
        )[0][1]


        if prediction == 1:

            result = "Rain Expected 🌧️"

        else:

            result = "No Significant Rain Expected ☀️"


        return jsonify({

            "prediction": result,

            "probability":
                round(
                    probability * 100,
                    2
                )

        })


    except Exception as e:

        return jsonify({

            "error":
                str(e)

        }), 400


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
