// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "weatherappfirebase-73f42.firebaseapp.com",
  databaseURL: "https://weatherappfirebase-73f42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weatherappfirebase-73f42",
  storageBucket: "weatherappfirebase-73f42.appspot.com",
  messagingSenderId: "703063055599",
  appId: "1:703063055599:web:44bda17f70956fa0648f1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get weather and save search
window.getWeather = async function () {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = ""; // Your OpenWeatherMap API key

  if (city === "") {
    document.getElementById("weatherResult").innerHTML = "❗ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      // Display weather info
      document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;

      // Save to Firebase
      push(ref(database, "searches/"), {
        city: data.name,
        temperature: data.main.temp,
        timestamp: new Date().toISOString()
      });

    } else {
      document.getElementById("weatherResult").innerHTML = "❌ City not found.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("weatherResult").innerHTML = "⚠️ Failed to fetch weather.";
  }
};
