const API_URL = "http://127.0.0.1:5000";

async function getPrediction() {
  const p = document.getElementById("panchayat").value;
  const status = document.getElementById("status");
  status.textContent = "⏳ Getting AI prediction...";

  try {
    const response = await fetch(`${API_URL}/predict?panchayat=${p}`);
    if (!response.ok) throw new Error("Backend error");
    const data = await response.json();

    document.getElementById("rainfall").textContent = data.rainfall_mm + " mm";
    document.getElementById("temperature").textContent = data.temperature_c + " °C";
    document.getElementById("humidity").textContent = data.humidity_percent + " %";
    document.getElementById("confidence").textContent = data.confidence_percent + " %";
    document.getElementById("aiRain").textContent = data.rainfall_mm + " mm";
    document.getElementById("mapInfo").textContent =
      `${data.panchayat}: AI predicts ${data.rainfall_mm} mm rainfall and ${data.temperature_c} °C.`;

    status.textContent = "✅ Prediction received from Python ML backend.";
  } catch (error) {
    status.textContent = "❌ Backend not running. Start Flask using: python app.py";
  }
}

function choose(p) {
  document.getElementById("panchayat").value = p;
  getPrediction();
}

function showAdvice() {
  const crop = document.getElementById("crop").value;
  const rain = parseFloat(document.getElementById("rainfall").textContent) || 0;
  let message;

  if (rain >= 30) {
    message = `${crop}: Heavy rainfall expected. Avoid unnecessary irrigation and consider drainage.`;
  } else if (rain >= 10) {
    message = `${crop}: Moderate rainfall expected. Monitor soil moisture and plan field work carefully.`;
  } else {
    message = `${crop}: Low rainfall expected. Check soil moisture and consider irrigation if required.`;
  }

  document.getElementById("advice").textContent = "🌾 " + message;
}

function sendFeedback() {
  const box = document.getElementById("feedback");
  const msg = document.getElementById("feedbackMsg");
  if (!box.value.trim()) {
    msg.textContent = "Please enter feedback.";
    return;
  }
  msg.textContent = "✅ Thank you! Feedback recorded for the demo.";
  box.value = "";
}