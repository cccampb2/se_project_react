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
}) {
  return (
    <Modal name={"modalWithForm"} isOpen={isOpen} onClose={onExitButtonClick}>
      <h2 className="modal__title">{title}</h2>
      <form
        noValidate
        onSubmit={onSubmit(handleSubmit)}
        className="modal__form"
      >
        {children}
        <button type="submit" disabled={!isValid} className="modal__submit-btn">
          {isLoading ? "Adding..." : buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
