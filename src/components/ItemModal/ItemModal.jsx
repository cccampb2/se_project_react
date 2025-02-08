import { Modal } from "../Modal/Modal";
import "./ItemModal.css";

function ItemModal({ isOpen, card, onExitButtonClick, openConfirmationModal }) {
  return (
    <Modal isOpen={isOpen} onClose={onExitButtonClick} name={"card"}>
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
    </Modal>
  );
}

export default ItemModal;
