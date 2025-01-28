import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR logo" />
      <p className="header__date-and-location">June 15, New York</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Caleb Campbell</p>
        <img src={avatar} alt="Caleb Campbell" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
