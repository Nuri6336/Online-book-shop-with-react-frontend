import React from "react";
import "../css/updatemodal.css";
import { createPortal } from "react-dom";
import UserDetails from "./UserDetails";

const modalRoot = document.getElementById("modal-root");

const UserModal = ({ isOpen, closeModal, userId }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="blur-background"></div>
      <div className="book-modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <UserDetails userId={userId} />
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default UserModal;
