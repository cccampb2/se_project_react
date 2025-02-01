import avatar from "../../assets/avatar.png";
import "./HeaderModal.css";

function HeaderModal({ onAddButtonClick, onClose, isMobileMenuOpened }) {
  return (
    <div
      className={`modal__content_type_header ${
        isMobileMenuOpened ? "modal__content_type_header-is-opened" : ""
      }`}
    >
      <div className="header__user-container">
        <p className="header__username">Caleb Campbell</p>
        <img src={avatar} alt="Caleb Campbell" className="header__avatar" />
      </div>
      <button
        type="button"
        onClick={onAddButtonClick}
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <button
        onClick={() => {
          onClose(false);
        }}
        className="header__modal-exit-button"
      ></button>
    </div>
  );
}

export default HeaderModal;
