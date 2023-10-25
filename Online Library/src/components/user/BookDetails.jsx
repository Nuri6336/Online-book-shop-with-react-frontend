import { useState } from "react";
import RevviewModal from "./ReviewModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import BookRatingsAndReviews from "./BookRatingsAndReviews";

const BookDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOccupied, setIsOccupied] = useState();
  const [isReserved, setIsReserved] = useState();
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBorrow = () => {
    axiosInstance
      .post(`/books/${bookId}/borrow`)
      .then((response) => {
        navigate("/borrowedbooks");
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  };

  const handleReserve = () => {
    axiosInstance
      .post(`/books/${bookId}/reserve`)
      .then((response) => {
        navigate("/homeuser");
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  };

  const handleCancelReserve = () => {
    axiosInstance
      .delete(`/books/${bookId}/cancel-reservation`)
      .then((response) => {
        navigate("/homeuser");
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  };

  //Calling book details api
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axiosInstance
      .get(`/books/${bookId}`)
      .then((response) => {
        setBookDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [bookId]);

  useEffect(() => {
    axiosInstance
      .get(`/books/${bookId}/check`)
      .then((response) => {
        if (response.data == true) {
          setIsOccupied(true);
        } else {
          setIsOccupied(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [bookId]);

  useEffect(() => {
    axiosInstance
      .get(`/books/${bookId}/check-reserve/${userId}`)
      .then((response) => {
        if (response.data == true) {
          setIsReserved(true);
        } else {
          setIsReserved(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [bookId]);

  useEffect(() => {
    axiosInstance
      .get(`/books/${bookId}/reviews`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [bookId]);

  // Replace these with actual book details from your data or API
  const book = {
    title: "Sample Book",
    author: "John Doe",
    publishedYear: 2023,
    genre: "Fiction",
    ISBN: "1234567890",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    url: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  };

  return (
    <>
      <div
        className="container"
        style={{
          minHeight: "505px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="col-md-4">
            <Link to="#" onClick={openModal}>
              <img
                // src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
                src={bookDetails.imgUrl || book.url}
                alt="Book Cover"
                className="book-cover"
                style={{ height: "200px", width: "150px" }}
              />
            </Link>
          </div>
          <div className="col-md-4">
            <h1 className="book-title">{bookDetails.bookName}</h1>
            <p className="book-author">Author: {bookDetails.authorName}</p>
            <p>Published: {bookDetails.publishedYear}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.ISBN}</p>
          </div>
        </div>
        <div className="row book-description" style={{ width: "580px" }}>
          <div className="col-md-12">
            <h2>Description</h2>
            <p>{bookDetails.bookDescription || book.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              className="button-container"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!isOccupied && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleBorrow()}
                >
                  Borrow
                </button>
              )}
              {isOccupied && (
                <button
                  className="btn btn-primary"
                  disabled
                  style={{ backgroundColor: "#a1b5ca", color: "#000" }}
                >
                  Not available
                </button>
              )}
              <div style={{ width: "114px" }} />
              {isOccupied && !isReserved && (
                <button
                  className="btn btn-success"
                  onClick={() => handleReserve()}
                >
                  Reserve
                </button>
              )}
              {!isOccupied && !isReserved && (
                <button
                  className="btn btn-success"
                  disabled
                  style={{
                    color: "#000",
                    backgroundColor: "#rgb(120, 125, 121)",
                    borderColor: "#89938c",
                  }}
                >
                  Not Reserved
                </button>
              )}
              {!isOccupied && isReserved && (
                <button
                  className="btn btn-success"
                  disabled
                  style={{
                    color: "#000",
                    backgroundColor: "#rgb(120, 125, 121)",
                    borderColor: "#89938c",
                  }}
                >
                  Not available
                </button>
              )}
              {isOccupied && isReserved && (
                <button
                  className="btn btn-success"
                  style={{ color: "#000", backgroundColor: "#a6ceaf" }}
                  onClick={handleCancelReserve}
                >
                  Cancel resrvation
                </button>
              )}
              <RevviewModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                bookId={bookId}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="book-reviews-list">
        {review &&
          review.map((review) => (
            <div key={review.id}>
              <BookRatingsAndReviews
                rating={review.ratings}
                reviews={review.review}
                userEntity={review.userEntity}
                reviewTime={review.reviewTime}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default BookDetails;
