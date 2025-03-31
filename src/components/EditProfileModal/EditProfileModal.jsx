import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./EditProfileModal.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function EditProfileModal({ isOpen, onEdit, onCloseModal, isLoading }) {
  const form = useForm({ mode: "onTouched" });
  const { resetField, register, handleSubmit, formState, setValue } = form;
  const { errors, isValid } = formState;
  const { currentUser } = useContext(CurrentUserContext);

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    if (isOpen) {
      setValue("name_edit", currentUser.name);
      setValue("avatar_edit", currentUser.avatar);
    }
  }, [isOpen]);

  const handleFormSubmit = (data, e) => {
    onEdit(data);
  };

  return (
    <ModalWithForm
      isValid={isValid}
      isLoading={isLoading}
      title={"Change Profile Data"}
      buttonText={"Save Changes"}
      isOpen={isOpen}
      onExitButtonClick={onCloseModal}
      handleSubmit={handleFormSubmit}
      onSubmit={handleSubmit}
      type="edit"
    >
      <label htmlFor="name_edit" className="modal__label">
        <div>
          Name *
          <span className="modal__error">{errors.name_edit?.message}</span>
        </div>

        <input
          {...register("name_edit", {
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
          id="name_edit"
          placeholder="Name"
        />
      </label>
      <label htmlFor="avatar_edit" className="modal__label">
        <div>
          Avatar URL *
          <span className="modal__error">{errors.avatar_edit?.message}</span>
        </div>

        <input
          {...register("avatar_edit", {
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
          id="avatar_edit"
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
