import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = '9d929fad8e11cb340245fcc261e58b1f';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.info);
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1 className="title">🌤 Weather Dashboard</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card fade-in">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <img src={weather.current.weather_icons[0]} alt="icon" />
            <p className="temp">{weather.current.temperature}°C</p>
            <p>{weather.current.weather_descriptions[0]}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_speed} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
