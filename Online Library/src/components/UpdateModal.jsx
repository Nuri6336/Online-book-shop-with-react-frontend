// src/components/BookModal.js
import React from "react";
import UpdateBookForm from "./UpdateBookForm";
import "../css/updatemodal.css";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const UpdateModal = ({ isOpen, closeModal, bookId }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="blur-background"></div>
      <div className="book-modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          >
            &times;
          </span>
          <h2>Update Book</h2>
          <UpdateBookForm bookId={bookId} />
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default UpdateModal;
