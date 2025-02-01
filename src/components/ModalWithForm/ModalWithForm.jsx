import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  onExitButtonClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_add-clothes">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onExitButtonClick}
          type="button"
          className="modal__close-btn modal__close-btn_type_add-clothes"
        />
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
