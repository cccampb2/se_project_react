import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./AddItemModal.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
function AddItemModal({ isOpen, onAddItem, onCloseModal, isLoading }) {
  const form = useForm({ mode: "onTouched" });
  const { resetField, register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    if (isOpen) {
      resetField("name");
      resetField("url");
      resetField("weather-type");
    }
  }, [isOpen]);

  const handleFormSubmit = (data, e) => {
    onAddItem({
      name: data.name,
      weather: data["weather-type"],
      imageUrl: data.url,
    });
  };

  return (
    <ModalWithForm
      isValid={isValid}
      isLoading={isLoading}
      title={"New Garment"}
      buttonText={"Add garment"}
      isOpen={isOpen}
      onExitButtonClick={onCloseModal}
      handleSubmit={handleFormSubmit}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        <div>
          Name
          <span className="modal__error">{errors.name?.message}</span>
        </div>
        <input
          {...register("name", {
            pattern: {
              value: /^[A-Za-z\s]{3,}$/,
              message:
                "Name must be 3+ characters (No special symbols/numbers)",
            },
            required: {
              value: true,
              message: "Name is required",
            },
          })}
          className="modal__input"
          type="text"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        <div>
          Image <span className="modal__error">{errors.url?.message}</span>
        </div>

        <input
          {...register("url", {
            required: {
              value: true,
              message: "Url is required",
            },
            pattern: {
              value:
                /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?(#.*)?$/i,

              message: "Invalid url format",
            },
          })}
          className="modal__input"
          type="url"
          id="imageUrl"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-btns">
        <div>
          <legend className="modal__legend">Select the weather type:</legend>
        </div>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            {...register("weather-type", {
              required: {
                value: true,
              },
            })}
            value="hot"
            name="weather-type"
            type="radio"
            id="hot"
            className="modal__radio-input"
          />
          <span className="custom-radio"></span>
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            {...register("weather-type", {
              required: {
                value: true,
                message: "Weather is required",
              },
            })}
            value="warm"
            name="weather-type"
            type="radio"
            id="warm"
            className="modal__radio-input"
          />
          <span className="custom-radio"></span>
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            {...register("weather-type", {
              required: {
                value: true,
                message: "Weather is required",
              },
            })}
            value="cold"
            name="weather-type"
            type="radio"
            id="cold"
            className="modal__radio-input"
          />
          <span className="custom-radio"></span>
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
