import React from "react";
import "../../css/user/bookrating.css";

const BookRatingsAndReviews = ({ rating, reviews, userEntity, reviewTime }) => {
  const fullStars = Math.floor(rating);

  return (
    <>
      <div className="book-rating-and-reviews">
        <div className="rating">
          <div className="user-img">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Common_Kingfisher_Alcedo_atthis.jpg"
              alt="image"
            />
          </div>
          <div className="right-side-details">
            <div className="name-date">
              <div className="name-rating">By {userEntity.firstName} </div>
              <div className="date-rating"> {reviewTime}</div>
            </div>
            <div className="stars">
              {Array(fullStars)
                .fill(null)
                .map((_, index) => (
                  <span key={`fullStar${index}`} className="star star-modal">
                    &#9733;
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="reviews">
          <ul>{reviews}</ul>
        </div>
      </div>
    </>
  );
};

export default BookRatingsAndReviews;
