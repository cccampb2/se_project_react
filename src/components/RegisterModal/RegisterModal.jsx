import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function RegisterModal({
  isOpen,
  onLogin,
  onCloseModal,
  isLoading,
  toggleLoginSwitch,
}) {
  const form = useForm({ mode: "onTouched" });
  const { resetField, register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    if (isOpen) {
      resetField();
    }
  }, [isOpen]);

  const handleFormSubmit = (data, e) => {};

  return (
    <ModalWithForm
      isValid={isValid}
      isLoading={isLoading}
      title={"Sign Up"}
      buttonText={"Sign Up"}
      isOpen={isOpen}
      onExitButtonClick={onCloseModal}
      handleSubmit={handleFormSubmit}
      onSubmit={handleSubmit}
      signUp={true}
      type="signUp"
      toggleLoginSwitch={toggleLoginSwitch}
    >
      <label htmlFor="email-signUp" className="modal__label">
        <div>
          Email *<span className="modal__error">{errors.email?.message}</span>
        </div>
        <input
          {...register("email-signUp", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format!",
            },
          })}
          className="modal__input"
          type="email"
          id="email-signUp"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password-signUp" className="modal__label">
        <div>
          Password *
          <span className="modal__error">{errors.password?.message}</span>
        </div>

        <input
          {...register("password-signUp", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="modal__input"
          type="password"
          id="password-signUp"
          placeholder="Password"
        />
      </label>
      <label htmlFor="name-signUp" className="modal__label">
        <div>
          Name *<span className="modal__error">{errors.name?.message}</span>
        </div>

        <input
          {...register("name-signUp", {
            required: {
              value: true,
              message: "Name is required",
            },
            pattern: {
              value: /^[A-Za-z\s]{3,}$/,
              message:
                "Name must be 3+ characters (No special symbols/numbers)",
            },
          })}
          className="modal__input"
          type="text"
          id="name-signUp"
          placeholder="Name"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        <div>
          Avatar URL *
          <span className="modal__error">{errors.avatar?.message}</span>
        </div>

        <input
          {...register("avatar", {
            required: {
              value: true,
              message: "Avatar URL is required",
            },
            pattern: {
              value:
                /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?(#.*)?$/i,

              message: "Invalid url format",
            },
          })}
          className="modal__input"
          type="text"
          id="avatar"
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
