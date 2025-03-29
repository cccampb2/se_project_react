import avatar from "../../assets/avatar.png";
import "./HeaderModal.css";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function HeaderModal({
  onAddButtonClick,
  onClose,
  isMobileMenuOpened,
  isLoggedIn,
  handleLoginClick,
  handleSignUpClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div
      className={`modal__content_type_header ${
        isMobileMenuOpened ? "modal__content_type_header-is-opened" : ""
      }`}
    >
      {isLoggedIn && (
        <NavLink to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">
              {currentUser ? currentUser.name : "User name"}
            </p>
            {currentUser && (
              <img
                src={currentUser.avatar}
                alt={currentUser ? currentUser.name : "User name"}
                className="header__avatar"
              />
            )}{" "}
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
      {isLoggedIn && (
        <button
          type="button"
          onClick={onAddButtonClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}
      <ToggleSwitch isHidden={!isMobileMenuOpened} />
      <button
        onClick={() => {
          onClose(false);
        }}
        className="header__modal-exit-button"
      ></button>
    </div>
  );
}

export default HeaderModal;
