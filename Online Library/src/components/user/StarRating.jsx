import React, { useState } from "react";
import "../../css/user/starrating.css";

const StarRating = ({ totalStars, rating, onRatingChange }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (selectedStar) => {
    onRatingChange(selectedStar);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={
              starValue <= (hoveredStar || rating) ? "star selected" : "star"
            }
            onMouseEnter={() => setHoveredStar(starValue)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
