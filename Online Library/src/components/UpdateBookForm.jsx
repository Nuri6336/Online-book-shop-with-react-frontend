import React, { useEffect, useState } from "react";
import "../css/addbook.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBookForm = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState({});
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    publishedYear: "",
    bookDescription: "",
    imgUrl: "",
    detailsUrl: "",
  });

  //Calling api to show on book form
  useEffect(() => {
    axiosInstance
      .get(`/books/${bookId}`)
      .then((resp) => {
        const booksData = resp.data;
        setBookDetails(booksData);
        setFormData({
          bookName: booksData.bookName,
          authorName: booksData.authorName,
          publishedYear: booksData.publishedYear,
          bookDescription: booksData.bookDescription,
          imgUrl: booksData.imgUrl,
          detailsUrl: booksData.detailsUrl,
        });
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.log("Error Response Data:", errorMessage);
        } else {
          // Handle other types of errors
        }
      });
  }, [bookId]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      bookName: `${formData.bookName}`,
      authorName: `${formData.authorName}`,
      publishedYear: `${formData.publishedYear}`,
      bookDescription: `${formData.bookDescription}`,
      imgUrl: `${formData.imgUrl}`,
      detailsUrl: `${formData.detailsUrl}`,
    };

    console.log(formData);

    axiosInstance
      .put(`/books/update/${bookId}`, data)
      .then((resp) => {
        toast.success("Book Updated successful!", {
          position: "top-right",
        });
        navigate("/home");
      })
      .catch((error) => {});
  };

  return (
    <div className="container" style={{ minHeight: "497px" }}>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="row-one-addbook">
          <div className="form-group">
            <label htmlFor="bookName">Book Name:</label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="authorName">Author Name:</label>
            <input
              type="text"
              className="form-control"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="publishedYear">Published Year:</label>
          <input
            type="text"
            className="form-control"
            id="publishedYear"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookDescription">Book Description:</label>
          <textarea
            className="form-control"
            id="bookDescription"
            name="bookDescription"
            value={formData.bookDescription}
            onChange={handleChange}
          />
        </div>
        <div className="row-one-addbook">
          <div className="form-group">
            <label htmlFor="imgUrl">Image URL:</label>
            <input
              type="text"
              className="form-control"
              id="imgUrl"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="detailsUrl">Details URL:</label>
            <input
              type="text"
              className="form-control"
              id="detailsUrl"
              name="detailsUrl"
              value={formData.detailsUrl}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
