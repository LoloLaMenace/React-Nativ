import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { func } from 'prop-types';

function apiCallComponent(longitude, latitude){

     const [weatherData, setWeatherData] = useState(35);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fa1a67d96cbb561d5f26fb34bd433537&units=metric&lang=fr`;
    // fetch(apiUrl)
    //     .then(response => response.json())
    //     .then(data => setWeatherData(data))
    //     .catch(error => console.error('Error fetching weather data:', error));

    return weatherData;
    }

export default apiCallComponent;