import "./WeatherCard.css";
import { timeOfDayImages } from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        className="weather-card__image"
        src={timeOfDayImages[weatherData.imageName]}
        alt="cloudy banner"
      ></img>
    </section>
  );
}

export default WeatherCard;
