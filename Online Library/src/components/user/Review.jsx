import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Review = ({ bookId }) => {
  const [newReview, setNewReview] = useState("");
  const navigate = useNavigate();

  const handleReviewSubmit = () => {
    const data = {
      review: newReview,
      ratings: rating,
    };

    axiosInstance
      .post(`/books/${bookId}/reviews/create`, data)
      .then((response) => {
        navigate("/homeuser");
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  };

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="container">
      <h2>Reviews</h2>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write your review..."
        rows="5"
        style={{ width: "100%" }}
      />

      <div className="star-rating">
        <h1>Rating</h1>
        <StarRating
          totalStars={5}
          rating={rating}
          onRatingChange={handleRatingChange}
        />
        <p>Selected Rating: {rating} stars</p>
        <button onClick={handleReviewSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Review;
