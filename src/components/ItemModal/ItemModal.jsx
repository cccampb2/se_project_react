import "./ItemModal.css";

function ItemModal({ isOpen, card, onExitButtonClick, openConfirmationModal }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onExitButtonClick}
          type="button"
          className="modal__close-btn modal__close-btn_type_card"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={() => {
              openConfirmationModal(card);
            }}
            className="modal__item-delete-btn"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
