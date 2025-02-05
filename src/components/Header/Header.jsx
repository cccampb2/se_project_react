import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { useState } from "react";
import ToggleSwitch from "../App/ToggleSwitch/ToggleSwitch";
import { Link, NavLink } from "react-router-dom";
function Header({ onAddButtonClick, weatherData, onBurgerClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo-date-location">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__modal-items">
        <ToggleSwitch />
        <button
          type="button"
          onClick={onAddButtonClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <NavLink to="/profile" className="header__link">
          <div className="header__user-container">
            <div className="header__username">Caleb Campbell</div>
            <img src={avatar} alt="Caleb Campbell" className="header__avatar" />
          </div>
        </NavLink>
      </div>
      <button
        onClick={() => {
          onBurgerClick(true);
        }}
        className="header__open-modal-button"
      ></button>
    </header>
  );
}

export default Header;
