import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import searchIcon from './images/search.png';
import clouds from './images/clouds.png';
import clear from './images/clear.png';
import rain from './images/rain.png';
import drizzle from './images/drizzle.png';
import mist from './images/mist.png';
import wind from './images/wind.png';

import humidity from './images/humidity.png';2

function WeatherApp() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const API_KEY = 'e8bf1071d7783959ee1e4202eaab2104';

  const fetchData = () => {
    if (!input) return;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        alert('City not found!');
        console.error(err);
      });
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clouds':
        return clouds;
      case 'Clear':
        return clear;
      case 'Rain':
        return rain;
      case 'Drizzle':
        return drizzle;
      case 'Mist':
        return mist;
      default:
        return clouds;
    }
  };

  return (
      
    <div className='weather-container'>
       <div className='card'>
        <h1 className='heading'>Weather-App</h1>
        <div className='search'>
          <input
            className='input'
            type='text'
            placeholder='Enter city name...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='btn' onClick={fetchData}>
            <img className='search-img' src={searchIcon} alt='search' />
          </button>
        </div>

        {data?.weather?.[0]?.main && (
          <div className='weather'>
            <img
              className='weather-icon'
              src={getWeatherIcon(data.weather[0].main)}
              alt='weather icon'
            />
            <h2 className='temp'>{Math.round(data.main.temp)}°C</h2>
            <h2 className='city'>{data.name}</h2>

            <div className='details'>
              <div className='col'>
                <img src={humidity} alt='humidity' />
                <div className='details1'>
                  <p>{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className='col'>
                <img src={wind} alt='wind' />
                <div className='details1'>
                  <p>{data.wind.speed} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;