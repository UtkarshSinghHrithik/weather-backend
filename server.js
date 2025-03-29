const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();



const app = express();
app.use(cors({
  origin: ["http://localhost:5173" , "https://elegant-baklava-24a2c8.netlify.app"]
})); // CORS enable for frontend requests
const PORT = 5000;

// OpenWeather API Key (Replace with your own key)
const API_KEY = process.env.API_KEY;

// Endpoint to get weather by city name
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).json({ error: "City Name is Required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
    console.log( res.json(response.data))
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.get("/", (req, res) => {
  res.send({
    activeStatus:true,
    error:false, 
  })
});






// Endpoint to get weather by coordinates (latitude & longitude)
app.get("/weather/coordinates", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
