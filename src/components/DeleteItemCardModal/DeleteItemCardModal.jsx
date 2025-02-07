import "./DeleteItemCardModal.css";

function DeleteItemCardModal({
  isOpen,
  onExitButtonClick,
  handleCardDelete,
  handleCancelDelete,
  isLoading,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_delete-item-card">
        <button
          onClick={onExitButtonClick}
          type="button"
          className="modal__close-btn modal__close-btn_type_delete-item-card"
        ></button>
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
      </div>
    </div>
  );
}

export default DeleteItemCardModal;
