import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
function Header({
  onAddButtonClick,
  weatherData,
  onBurgerClick,
  isLoggedIn,
  handleSignUpClick,
  handleLoginClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = useLocation();
  const isProfile = location.pathname === "/profile";
  return (
    <header className="header">
      <div
        className={`header__logo-date-location ${
          isProfile ? "header__profile" : ""
        }`}
      >
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </NavLink>

        <p
          className={`header__date-and-location ${
            isProfile ? "header__profile-date-location" : ""
          }`}
        >
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__modal-items">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            type="button"
            onClick={onAddButtonClick}
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        )}
        {isLoggedIn && (
          <NavLink to="/profile" className="header__link">
            <div className="header__user-container">
              <div className="header__username">
                {currentUser ? currentUser.name : "User name"}
              </div>
              {currentUser.avatar && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              )}
              {!currentUser.avatar && (
                <div className="header__placeholder-avatar">
                  {currentUser.name[0]}
                </div>
              )}
            </div>
          </NavLink>
        )}
        {!isLoggedIn && (
          <div className="header__login-signup-container">
            <button
              type="button"
              onClick={handleSignUpClick}
              className="header__sign-up-btn"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleLoginClick}
              className="header__log-in-btn"
            >
              Log In
            </button>
          </div>
        )}
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
