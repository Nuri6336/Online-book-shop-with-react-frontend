import "../../css/updatemodal.css";
import { createPortal } from "react-dom";
import Review from "./Review";

const modalRoot = document.getElementById("modal-root");

const RevviewModal = ({ isOpen, closeModal, bookId }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="blur-background"></div>
      <div className="book-modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <Review bookId={bookId} />
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default RevviewModal;
