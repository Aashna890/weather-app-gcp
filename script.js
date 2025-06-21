import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "", 
  authDomain: "weatherappfirebase-73f42.firebaseapp.com",
  databaseURL: "https://weatherappfirebase-73f42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weatherappfirebase-73f42",
  storageBucket: "weatherappfirebase-73f42.appspot.com",
  messagingSenderId: "703063055599",
  appId: "1:703063055599:web:44bda17f70956fa0648f1a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const apiKey = "";

window.getWeather = async function () {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    resultDiv.innerHTML = "❗ Please enter a city name.";
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;

      push(ref(database, "searches/"), {
        city: data.name,
        temperature: data.main.temp,
        timestamp: new Date().toISOString()
      });

    } else {
      resultDiv.innerHTML = "❌ City not found.";
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "⚠️ Could not fetch weather.";
  }
};
