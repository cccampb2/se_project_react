import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./AddItemModal.css";
import { useEffect, useState } from "react";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
function AddItemModal({ isOpen, onAddItem, onCloseModal, isLoading }) {
  // declare state for each input field
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [temperatureForClothing, setTemperatureForClothing] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setUrl("");
    }
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable

  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlOnChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRadioButtonOnChange = (e) => {
    setTemperatureForClothing(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name: name, weather: temperatureForClothing, imageUrl: url });
  };

  return (
    <ModalWithForm
      isLoading={isLoading}
      title={"New Garment"}
      buttonText={"Add garment"}
      isOpen={isOpen}
      onExitButtonClick={onCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        <div>
          Name <span id="name-error"></span>
        </div>
        <input
          value={name}
          onChange={handleNameOnChange}
          className="modal__input"
          type="text"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        <div>
          Image <span id="image-error"></span>
        </div>

        <input
          value={url}
          onChange={handleUrlOnChange}
          className="modal__input"
          type="url"
          id="imageUrl"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-btns">
        <div>
          <legend className="modal__legend">Select the weather type:</legend>
          <span id="radio-error"></span>
        </div>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            onChange={handleRadioButtonOnChange}
            name="weather-type"
            type="radio"
            id="hot"
            className="modal__radio-input"
          />{" "}
          <span className="custom-radio"></span>
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            onChange={handleRadioButtonOnChange}
            name="weather-type"
            type="radio"
            id="warm"
            className="modal__radio-input"
          />{" "}
          <span className="custom-radio"></span>
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            onChange={handleRadioButtonOnChange}
            name="weather-type"
            type="radio"
            id="cold"
            className="modal__radio-input"
          />{" "}
          <span className="custom-radio"></span>
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
