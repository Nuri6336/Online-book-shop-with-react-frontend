import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/book.css";
import { useState } from "react";
import UpdateModal from "./UpdateModal";
import axiosInstance from "../utils/AxiosInstance";
import { Link } from "react-router-dom";

const Book = ({ title, description, imageUrl, details, bookId, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(bookId);
  };

  return (
    <div className="my-3">
      <div
        className="card card-book"
        style={{ width: "18rem", borderRadius: "10px" }}
      >
        <img
          src={imageUrl}
          className="card-img-top"
          alt="Book Image"
          style={{ height: "20rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div
            className="btn-row-book"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link
              to={details}
              className="btn btn-sm btn-primary one"
              target="_blank"
              rel="noreferrer"
            >
              Details
            </Link>
            <div className="btn-right-book two">
              <button
                type="button"
                className="btn btn-light"
                style={{ marginRight: "5px" }}
                onClick={openModal}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <UpdateModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                bookId={bookId}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
