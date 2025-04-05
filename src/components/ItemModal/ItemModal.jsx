import { Modal } from "../Modal/Modal";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, card, onExitButtonClick, openConfirmationModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  return (
    <Modal isOpen={isOpen} onClose={onExitButtonClick} name={"card"}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <div className="modal__footer-left">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            onClick={() => {
              openConfirmationModal(card);
            }}
            className="modal__item-delete-btn"
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
