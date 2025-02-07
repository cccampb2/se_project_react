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
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onExitButtonClick}
          type="button"
          className="modal__close-btn"
        />
        <form onSubmit={handleSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {isLoading ? "Adding..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
