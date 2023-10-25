import { Link } from "react-router-dom";
import "../../css/book.css";

const BookUser = ({ title, description, imageUrl, bookId }) => {
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
              to={`/bookdetailspage/${bookId}`}
              className="btn btn-sm btn-primary one"
              target="_blank"
              rel="noreferrer"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookUser;
