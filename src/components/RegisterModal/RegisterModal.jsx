import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function RegisterModal({
  isOpen,
  onRegister,
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
      resetField("email_signUp");
      resetField("password_signUp");
      resetField("avatar_signUp");
      resetField("name_signUp");
    }
  }, [isOpen]);

  const handleFormSubmit = (data, e) => {
    onRegister(data);
  };

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
      <label htmlFor="email_signUp" className="modal__label">
        <div>
          Email *
          <span className="modal__error">{errors.email_signUp?.message}</span>
        </div>
        <input
          {...register("email_signUp", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value:
                /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
              message: "Invalid email format!",
            },
          })}
          className="modal__input"
          type="email"
          id="email_signUp"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password_signUp" className="modal__label">
        <div>
          Password *
          <span className="modal__error">
            {errors.password_signUp?.message}
          </span>
        </div>

        <input
          {...register("password_signUp", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="modal__input"
          type="password"
          id="password_signUp"
          placeholder="Password"
        />
      </label>
      <label htmlFor="name_signUp" className="modal__label">
        <div>
          Name *
          <span className="modal__error">{errors.name_signUp?.message}</span>
        </div>

        <input
          {...register("name_signUp", {
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
          id="name_signUp"
          placeholder="Name"
        />
      </label>
      <label htmlFor="avatar_signUp" className="modal__label">
        <div>
          Avatar URL *
          <span className="modal__error">{errors.avatar_signUp?.message}</span>
        </div>

        <input
          {...register("avatar_signUp", {
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
          id="avatar_signUp"
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
