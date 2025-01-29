import "./WeatherCard.css";
import cloudy from "../../assets/weather-cards/cloudy.svg";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        className="weather-card__image"
        src={cloudy}
        alt="cloudy banner"
      ></img>
    </section>
  );
}

export default WeatherCard;
