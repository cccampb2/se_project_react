import { Modal } from "../Modal/Modal";
import "./DeleteItemCardModal.css";

function DeleteItemCardModal({
  isOpen,
  onExitButtonClick,
  handleCardDelete,
  handleCancelDelete,
  isLoading,
}) {
  return (
    <Modal
      name={"delete-item-card"}
      isOpen={isOpen}
      onClose={onExitButtonClick}
    >
      <p className="modal__question">
        Are you sure you want to delete this item?
      </p>
      <p className="modal__statement">This action is irreversible.</p>
      <button onClick={handleCardDelete} className="modal__delete-btn">
        {isLoading ? "Deleting..." : "Yes, delete item"}
      </button>
      <button onClick={handleCancelDelete} className="modal__cancel-btn">
        Cancel
      </button>
    </Modal>
  );
}

export default DeleteItemCardModal;
