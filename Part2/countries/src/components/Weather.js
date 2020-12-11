import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      )
      .then((response) => {
        setWeatherInfo(response.data);
      });
  }, []);

  if (weatherInfo.length === 0) {
    console.log("no weather info");
    return null;
  }
  return (
    <div>
      <h1>Weather in {city}</h1>

      <h3>Temperature: {weatherInfo.current.temperature} C</h3>
      {weatherInfo.current.weather_icons.map((icon) => (
        <img width="100" height="100" src={icon} alt=""></img>
      ))}
      <h3>wind: {weatherInfo.current.wind_speed} MPH</h3>
      <h4>direction: {weatherInfo.current.wind_dir}</h4>
    </div>
  );
};

export default Weather;
