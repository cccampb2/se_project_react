import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { useState } from "react";
function Header({ onAddButtonClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo-date-location">
        <img className="header__logo" src={logo} alt="WTWR logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__modal-items">
        <button
          type="button"
          onClick={onAddButtonClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Caleb Campbell</p>
          <img src={avatar} alt="Caleb Campbell" className="header__avatar" />
        </div>
      </div>
      <button className="header__open-modal-button"></button>
    </header>
  );
}

export default Header;
