import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch({ isHidden }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className={`switch ${isHidden ? "switch_hidden" : ""}`}>
      <input
        onChange={handleToggleSwitchChange}
        className="switch__checkbox"
        type="checkbox"
      />
      <span className="switch__slider">
        <span className="switch__fahrenheit">F</span>
        <span className="switch__celsius">C</span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
