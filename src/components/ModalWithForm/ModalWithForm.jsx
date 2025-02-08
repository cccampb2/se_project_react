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
}) {
  return (
    <Modal name={"modalWithForm"} isOpen={isOpen} onClose={onExitButtonClick}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={handleSubmit} className="modal__form">
        {children}
        <button type="submit" className="modal__submit-btn">
          {isLoading ? "Adding..." : buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
