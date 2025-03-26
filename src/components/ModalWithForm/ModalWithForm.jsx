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
            {isLoading ? "Adding..." : buttonText}
          </button>
          {props.signUp && (
            <button type="button" className="modal__sign-up-btn">
              or Sign Up
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
