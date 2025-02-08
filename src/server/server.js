const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

const PORT = 8082;

// API Keys 
const GEONAMES_USERNAME = process.env.GEO_USER;
const WEATHERBIT_API_KEY = process.env.WEATHER_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_KEY;

app.post('/getTripData', async (req, res) => {
    try {
        const { destination, travelDate } = req.body;

        if (!destination || !travelDate) {
            return res.status(400).json({ error: "Missing destination or travelDate" });
        }

        console.log(`Fetching data for: ${destination} on ${travelDate}`);

        // Get location details from GeoNames
        const geoRes = await fetch(`http://api.geonames.org/searchJSON?q=${encodeURIComponent(destination)}&maxRows=1&username=${GEONAMES_USERNAME}`);
        const geoData = await geoRes.json();
        
        if (!geoData.geonames.length) {
            return res.status(404).json({ error: "Location not found in GeoNames" });
        }

        const { lat, lng, name, countryName } = geoData.geonames[0];

        console.log(`GeoNames found: ${name}, ${countryName} (Lat: ${lat}, Lng: ${lng})`);

        // Get weather data from Weatherbit
        const weatherRes = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`);
        const weatherData = await weatherRes.json();
        
        if (!weatherData.data || weatherData.data.length === 0) {
            return res.status(404).json({ error: "Weather data not available" });
        }

        const tripDate = new Date(travelDate);
        const currentDate = new Date();
        const countdown = Math.ceil((tripDate - currentDate) / (1000 * 60 * 60 * 24));

        console.log(`Trip is in ${countdown} days`);

        const weather = weatherData.data[0]; 
        const weatherInfo = {
            highTemp: weather.high_temp,
            lowTemp: weather.low_temp,
            description: weather.weather.description
        };

        console.log(`Weather: ${weatherInfo.description}, High: ${weatherInfo.highTemp}°C, Low: ${weatherInfo.lowTemp}°C`);

        // Get image from Pixabay
        const imageRes = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(destination)}&image_type=photo`);
        const imageData = await imageRes.json();

        const imageUrl = imageData.hits.length > 0 ? imageData.hits[0].webformatURL : "https://dummyimage.com/300x200/000/fff&text=No+Image+Found";

        console.log(`Image URL: ${imageUrl}`);

        res.json({
            destination: `${name}, ${countryName}`,
            travelDate: new Date(travelDate).toLocaleDateString('en-US'),
            countdown,
            weather: weatherInfo,
            imageUrl
        });

    } catch (error) {
        console.error("Error fetching trip data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export app for testing
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app; 
