# 🌦️ Weather App – Real-time Weather Info with GCP

## Overview

This is a simple yet complete **Weather Application** that allows users to search for real-time weather information for any city in the world. The project combines frontend development with key components of **Google Cloud Platform (GCP)** services.

## Features

- Get current **temperature**, **weather condition**, and **wind speed** by entering a city name.
- Deployed on **Google Cloud Storage** (publicly accessible).
- Integrated with **Firebase**, **Cloud Pub/Sub**, and **Cloud Logging** for full-stack cloud functionality.
## Live App

URL:https://storage.googleapis.com/weather_app_buck/index.html
⚠️ **Note**: Due to security reasons, the `OpenWeatherMap API key` and Firebase `apiKey` have been removed from the live app.  
You can clone the project and insert your own keys to make it fully functional.
## How It Works

1. **User enters a city name.**
2. JS makes a **fetch request** to `api.openweathermap.org` using the city name.
3. Weather data is extracted and displayed in the UI.
4. Each search is:
   - Sent to **Pub/Sub** (simulated event messaging).
   - Logged in **Cloud Logging** for history and debugging.
   - Optionally synced with **Firebase** (for real-time integration).
## Things to Remember

- The app uses **OpenWeatherMap API**
- You can redeploy the app by uploading the updated HTML/CSS/JS files to the GCP bucket.
