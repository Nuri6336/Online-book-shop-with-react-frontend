import { Link, useNavigate } from "react-router-dom";
import "../../css/book.css";
import axiosInstance from "../../utils/AxiosInstance";

const BorrowedBook = ({ title, description, imageUrl, bookId }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    axiosInstance
      .put(`/books/${bookId}/return`)
      .then((resp) => {
        navigate("/homeuser");
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.log("Error Response Data:", errorMessage);
        }
      });
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
              to={`/bookdetailspage/${bookId}`}
              className="btn btn-sm btn-primary one"
              target="_blank"
              rel="noreferrer"
            >
              Details
            </Link>
            <div className="btn-right-book two">
              <button
                type="button"
                className="btn btn-dark"
                style={{ marginRight: "5px" }}
                onClick={handleReturn}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBook;
