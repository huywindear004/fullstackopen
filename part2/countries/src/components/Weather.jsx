import { useState, useEffect } from "react";

import weatherService from "../services/weather";

export default function Weather({ city }) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    weatherService.getWeather(city).then((data) => setWeather(data));
  }, [city]);

  if (!weather.current) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div>
        <strong>Local time: </strong>
        {weather.location.localtime}
      </div>
      <div>
        <strong>temperature:</strong> {weather.current.temp_c} Celsius
      </div>
      <div>
        <img src={weather.current.condition.icon} alt="weather icon" />
      </div>
      <div>
        <strong>wind:</strong> {weather.current.wind_kph} kph direction{" "}
        {weather.current.wind_dir}
      </div>
    </div>
  );
}
