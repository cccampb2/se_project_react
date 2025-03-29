import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./LoginModal.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function LoginModal({
  isOpen,
  onLogin,
  onCloseModal,
  isLoading,
  toggleSignUpSwitch,
}) {
  const form = useForm({ mode: "onTouched" });
  const { resetField, register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    if (isOpen) {
      resetField("email_login");
      resetField("password_login");
    }
  }, [isOpen]);

  const handleFormSubmit = (data, e) => {
    onLogin(data);
  };

  return (
    <ModalWithForm
      isValid={isValid}
      isLoading={isLoading}
      title={"Log In"}
      buttonText={"Log In"}
      isOpen={isOpen}
      onExitButtonClick={onCloseModal}
      handleSubmit={handleFormSubmit}
      onSubmit={handleSubmit}
      login={true}
      type="login"
      toggleSignUpSwitch={toggleSignUpSwitch}
    >
      <label htmlFor="email_login" className="modal__label">
        <div>
          Email
          <span className="modal__error">{errors.email_login?.message}</span>
        </div>
        <input
          {...register("email_login", {
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
          id="email_login"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password_login" className="modal__label">
        <div>
          Password
          <span className="modal__error">{errors.password_login?.message}</span>
        </div>

        <input
          {...register("password_login", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="modal__input"
          type="password"
          id="password_login"
          placeholder="Password"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
