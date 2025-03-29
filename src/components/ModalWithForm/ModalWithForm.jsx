import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onExitButtonClick,
  handleSubmit,
  isLoading,
  onSubmit,
  isValid,
  type,
  toggleLoginSwitch,
  toggleSignUpSwitch,
  ...props
}) {
  return (
    <Modal
      name={"modalWithForm"}
      type={type}
      isOpen={isOpen}
      onClose={onExitButtonClick}
    >
      <h2 className="modal__title">{title}</h2>
      <form
        noValidate
        onSubmit={onSubmit(handleSubmit)}
        className="modal__form"
      >
        {children}
        <div className="modal__btns">
          <button
            type="submit"
            disabled={!isValid}
            className="modal__submit-btn"
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
          {props.login && (
            <button
              onClick={toggleSignUpSwitch}
              type="button"
              className="modal__sign-up-btn"
            >
              or Sign Up
            </button>
          )}

          {props.signUp && (
            <button
              onClick={toggleLoginSwitch}
              type="button"
              className="modal__log-in-btn"
            >
              or Log In
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
