const BACKEND_URL = "http://127.0.0.1:5000";


/* ===============================
   LOCATION
================================ */

function getLocationWeather() {

    const locationElement =
        document.getElementById("location");

    if (!navigator.geolocation) {

        locationElement.innerText =
            "Geolocation is not supported";

        return;
    }


    locationElement.innerText =
        "Detecting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            locationElement.innerText =
                `Latitude: ${latitude.toFixed(4)},
                 Longitude: ${longitude.toFixed(4)}`;


            loadWeather(latitude, longitude);

        },

        function(error) {

            locationElement.innerText =
                "Location permission denied";

        }

    );

}


/* ===============================
   LOAD WEATHER
================================ */

async function loadWeather(latitude, longitude) {

    try {

        const response = await fetch(
            `${BACKEND_URL}/weather?lat=${latitude}&lon=${longitude}`
        );


        if (!response.ok) {

            throw new Error(
                "Weather API request failed"
            );

        }


        const data = await response.json();


        document.getElementById("temperature")
            .innerText =
            data.temperature + " °C";


        document.getElementById("humidity")
            .innerText =
            data.humidity + " %";


        document.getElementById("rain")
            .innerText =
            data.rain_probability + " %";


        document.getElementById("wind")
            .innerText =
            data.wind_speed + " km/h";


    } catch (error) {

        console.error(error);

        /*
           Demo fallback values.
        */

        document.getElementById("temperature")
            .innerText = "32 °C";


        document.getElementById("humidity")
            .innerText = "65 %";


        document.getElementById("rain")
            .innerText = "35 %";


        document.getElementById("wind")
            .innerText = "12 km/h";

    }

}


/* ===============================
   AI PREDICTION
================================ */

const predictionForm =
    document.getElementById("predictionForm");


if (predictionForm) {

    predictionForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const temperature =
                parseFloat(
                    document.getElementById(
                        "temperatureInput"
                    ).value
                );


            const humidity =
                parseFloat(
                    document.getElementById(
                        "humidityInput"
                    ).value
                );


            const wind =
                parseFloat(
                    document.getElementById(
                        "windInput"
                    ).value
                );


            const cloud =
                parseFloat(
                    document.getElementById(
                        "cloudInput"
                    ).value
                );


            const result =
                document.getElementById(
                    "predictionResult"
                );


            result.innerHTML =
                "🤖 AI is analyzing the weather...";


            try {

                const response = await fetch(
                    `${BACKEND_URL}/predict`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            temperature:
                                temperature,

                            humidity:
                                humidity,

                            wind_speed:
                                wind,

                            cloud_cover:
                                cloud

                        })

                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.error ||
                        "Prediction failed"
                    );

                }


                result.innerHTML = `

                    <h2>🤖 AI Prediction</h2>

                    <p>
                        <strong>
                        ${data.prediction}
                        </strong>
                    </p>

                    <p>
                        Rain Probability:
                        ${data.probability}%
                    </p>

                `;


            } catch (error) {

                console.error(error);


                result.innerHTML = `

                    <h3>⚠️ Backend not connected</h3>

                    <p>
                        Please start the Flask backend
                        before using AI prediction.
                    </p>

                `;

            }

        }
    );

}


/* ===============================
   PAGE LOAD
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Panchayat Weather AI loaded successfully."
        );

    }
);
