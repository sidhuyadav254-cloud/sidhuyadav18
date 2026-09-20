// ============================================================
// PANCHAYAT WEATHER AI
// COMPLETE JAVASCRIPT
// ============================================================


// ============================================================
// 1. BACKEND URL
// ============================================================

// Replace this with your deployed Render backend URL.
//
// Example:
// const BACKEND_URL = "https://panchayat-weather-ai.onrender.com";

const BACKEND_URL = "YOUR_RENDER_BACKEND_URL";


// ============================================================
// 2. GET HTML ELEMENTS
// ============================================================

const locationElement =
    document.getElementById("location");

const temperatureElement =
    document.getElementById("temperature");

const humidityElement =
    document.getElementById("humidity");

const rainElement =
    document.getElementById("rain");

const windElement =
    document.getElementById("wind");


// ============================================================
// 3. DETECT USER LOCATION
// ============================================================

function getLocationWeather() {

    if (!navigator.geolocation) {

        alert(
            "Geolocation is not supported by your browser."
        );

        return;
    }


    if (locationElement) {

        locationElement.innerText =
            "Detecting your location...";

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            console.log(
                "Latitude:",
                latitude
            );

            console.log(
                "Longitude:",
                longitude
            );


            getWeather(
                latitude,
                longitude
            );

        },

        function(error) {

            console.error(
                "Location Error:",
                error
            );


            if (locationElement) {

                locationElement.innerText =
                    "Location permission denied";

            }


            alert(
                "Please allow location permission to detect your location."
            );

        }

    );

}


// ============================================================
// 4. GET WEATHER
// ============================================================

async function getWeather(
    latitude,
    longitude
) {

    try {

        if (locationElement) {

            locationElement.innerText =
                "Loading weather...";

        }


        const response = await fetch(

            BACKEND_URL +
            "/weather?lat=" +
            latitude +
            "&lon=" +
            longitude

        );


        if (!response.ok) {

            throw new Error(
                "Weather request failed"
            );

        }


        const data =
            await response.json();


        console.log(
            "Weather Data:",
            data
        );


        // ----------------------------------------------------
        // LOCATION
        // ----------------------------------------------------

        if (locationElement) {

            locationElement.innerText =
                data.location ||
                "Your Location";

        }


        // ----------------------------------------------------
        // TEMPERATURE
        // ----------------------------------------------------

        if (temperatureElement) {

            temperatureElement.innerText =
                (data.temperature ?? "--") +
                " °C";

        }


        // ----------------------------------------------------
        // HUMIDITY
        // ----------------------------------------------------

        if (humidityElement) {

            humidityElement.innerText =
                (data.humidity ?? "--") +
                " %";

        }


        // ----------------------------------------------------
        // RAIN
        // ----------------------------------------------------

        if (rainElement) {

            const rainValue =
                data.rainfall ??
                data.rain ??
                "--";


            rainElement.innerText =
                rainValue +
                " %";

        }


        // ----------------------------------------------------
        // WIND
        // ----------------------------------------------------

        if (windElement) {

            const windValue =
                data.wind_speed ??
                data.wind ??
                "--";


            windElement.innerText =
                windValue +
                " km/h";

        }


        // ----------------------------------------------------
        // CHECK WEATHER ALERT
        // ----------------------------------------------------

        const temperature =
            Number(data.temperature || 0);

        const humidity =
            Number(data.humidity || 0);

        const rainfall =
            Number(
                data.rainfall ??
                data.rain ??
                0
            );

        const windSpeed =
            Number(
                data.wind_speed ??
                data.wind ??
                0
            );


        const alertMessage =
            checkWeatherAlert(
                temperature,
                humidity,
                rainfall,
                windSpeed
            );


        console.log(
            "Weather Alert:",
            alertMessage
        );


        // ----------------------------------------------------
        // FARMER RECOMMENDATION
        // ----------------------------------------------------

        const recommendation =
            getFarmerRecommendation(
                temperature,
                humidity,
                rainfall
            );


        console.log(
            "Farmer Recommendation:",
            recommendation
        );


    }

    catch (error) {

        console.error(
            "Weather Error:",
            error
        );


        if (locationElement) {

            locationElement.innerText =
                "Unable to connect to weather server";

        }


        // Show demo data if backend is unavailable

        showDemoWeather();

    }

}


// ============================================================
// 5. DEMO WEATHER
// ============================================================

function showDemoWeather() {

    if (temperatureElement) {

        temperatureElement.innerText =
            "32 °C";

    }


    if (humidityElement) {

        humidityElement.innerText =
            "65 %";

    }


    if (rainElement) {

        rainElement.innerText =
            "35 %";

    }


    if (windElement) {

        windElement.innerText =
            "12 km/h";

    }

}


// ============================================================
// 6. AI RAINFALL PREDICTION
// ============================================================

async function predictRainfall(

    temperature,
    humidity,
    windSpeed,
    cloudCover

) {

    try {

        const response =
            await fetch(

                BACKEND_URL +
                "/predict",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            temperature:
                                Number(
                                    temperature
                                ),

                            humidity:
                                Number(
                                    humidity
                                ),

                            wind_speed:
                                Number(
                                    windSpeed
                                ),

                            cloud_cover:
                                Number(
                                    cloudCover
                                )

                        })

                }

            );


        if (!response.ok) {

            throw new Error(
                "Prediction request failed"
            );

        }


        const data =
            await response.json();


        console.log(
            "AI Prediction:",
            data
        );


        return data;

    }

    catch (error) {

        console.error(
            "Prediction Error:",
            error
        );


        return {

            prediction:
                "Unable to connect to AI server"

        };

    }

}


// ============================================================
// 7. AI PREDICTION FORM
// ============================================================

const predictionForm =
    document.getElementById(
        "predictionForm"
    );


if (predictionForm) {

    predictionForm.addEventListener(

        "submit",

        async function(event) {

            event.preventDefault();


            // ------------------------------------------------
            // GET INPUTS
            // ------------------------------------------------

            const temperature =
                document.getElementById(
                    "temperatureInput"
                )?.value;


            const humidity =
                document.getElementById(
                    "humidityInput"
                )?.value;


            const windSpeed =
                document.getElementById(
                    "windInput"
                )?.value;


            const cloudCover =
                document.getElementById(
                    "cloudInput"
                )?.value;


            // ------------------------------------------------
            // VALIDATION
            // ------------------------------------------------

            if (

                temperature === "" ||
                humidity === "" ||
                windSpeed === "" ||
                cloudCover === ""

            ) {

                alert(
                    "Please enter all weather values."
                );

                return;

            }


            // ------------------------------------------------
            // RESULT ELEMENT
            // ------------------------------------------------

            const resultElement =
                document.getElementById(
                    "predictionResult"
                );


            if (resultElement) {

                resultElement.innerText =
                    "🤖 AI is predicting...";

            }


            // ------------------------------------------------
            // CALL BACKEND
            // ------------------------------------------------

            const result =
                await predictRainfall(

                    temperature,

                    humidity,

                    windSpeed,

                    cloudCover

                );


        // ------------------------------------------------
// DISPLAY RESULT
// ------------------------------------------------

if (resultElement) {

    if (result.prediction !== undefined) {

        let predictionText = result.prediction;

        // Convert prediction into user-friendly message
        if (
            predictionText === 1 ||
            predictionText === "1" ||
            predictionText === "Rain" ||
            predictionText === "rain"
        ) {

            resultElement.innerHTML =
                "🌧️ <strong>Rain Predicted</strong><br>" +
                "Rainfall may occur based on the given weather conditions.";

        }

        else if (
            predictionText === 0 ||
            predictionText === "0" ||
            predictionText === "No Rain" ||
            predictionText === "no rain"
        ) {

            resultElement.innerHTML =
                "☀️ <strong>No Rain Predicted</strong><br>" +
                "Rainfall is less likely based on the given weather conditions.";

        }

        else {

            resultElement.innerHTML =
                "🌦️ <strong>Prediction:</strong> " +
                predictionText;

        }

    }

    else if (result.result !== undefined) {

        resultElement.innerHTML =
            "🌦️ <strong>Prediction:</strong> " +
            result.result;

    }

    else {

        resultElement.innerHTML =
            "⚠️ Prediction result not received.";

    }

}
