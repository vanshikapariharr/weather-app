import React, { useState, useEffect } from 'react';
import './Weather.css';
import searchIcon from '../Assets/search.png';
import humidityIcon from '../Assets/humidity.png';
import windIcon from '../Assets/wind.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import drizzleIcon from '../Assets/drizzle.png';

const Weather = () => {
  const [city, setCity] = useState("Tempe, AZ");
  const [weather, setWeather] = useState(null);

  const apiKey = "EEKWK7D9K8RQ28ZGL4PG7PMNC";

  const getWeatherIcon = (conditions) => {
    conditions = conditions.toLowerCase();
    if (conditions.includes("rain")) return rainIcon;
    if (conditions.includes("drizzle")) return drizzleIcon;
    if (conditions.includes("snow")) return snowIcon;
    if (conditions.includes("cloud")) return cloudIcon;
    return clearIcon;
  };

  const search = async (cityName) => {
    if (!cityName) {
    alert("Please enter a city name.");
    return;
  }
    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&contentType=json&include=days&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      // Check if API returned valid data
      if (!data.days || data.days.length === 0 || !data.resolvedAddress) {
        alert("City not found. Please enter a valid city name.");
        return;
      }

      setWeather({
        name: data.resolvedAddress,
        temp: data.days[0].temp,
        humidity: data.days[0].humidity,
        wind: data.days[0].windspeed,
        conditions: data.days[0].conditions,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("An error occurred while fetching weather. Try again.");
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(city);
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => search(city)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {weather ? (
        <>
          <img
            src={getWeatherIcon(weather.conditions)}
            alt={weather.conditions}
            className='weather-icon'
          />
          <p className='temperature'>{weather.temp}°C</p>
          <p className='location'>{weather.name}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={windIcon} alt="wind" />
              <div>
                <p>{weather.wind} km/h</p>
                <span>Wind</span>
              </div>
            </div>
            <div className='col'>
              <span>{weather.conditions}</span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
