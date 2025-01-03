import axios from "axios";

const baseUrl = "http://api.weatherapi.com/v1/current.json?q=";

function getWeather(city) {
  const request = axios.get(
    `${baseUrl}${city}&key=${import.meta.env.VITE_WEATHER_API_KEY}`
  );
  return request.then((response) => response.data);
}

export default { getWeather };
