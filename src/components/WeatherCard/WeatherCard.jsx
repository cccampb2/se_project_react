import "./WeatherCard.css";
import { timeOfDayImages } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={timeOfDayImages[weatherData.imageName]}
        alt="cloudy banner"
      ></img>
    </section>
  );
}

export default WeatherCard;
