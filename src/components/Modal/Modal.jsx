import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({ name, onClose, children, isOpen, ...props }) => {
  // here is `useEffect` for the `Escape` listener
  useEffect(() => {
    // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // don’t forget to remove the listener in the `clean-up` function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // here is the overlay handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      {/* the container for the contents */}
      <div
        className={`modal__content modal__content_type_${name} ${
          props.type === "login" ? "modal_type_login" : ""
        } ${props.type === "signUp" ? "modal_type_signUp" : ""} ${
          props.type === "edit" ? "modal_type_edit" : ""
        } `}
      >
        {children}
        <button
          className={`modal__close-btn modal__close-btn_type_${name}`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
