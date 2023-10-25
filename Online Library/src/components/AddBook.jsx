import React, { useState } from "react";
import "../css/addbook.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    publishedYear: "",
    bookDescription: "",
    imgUrl: "",
    detailsUrl: "",
  });

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

    // You can handle form submission logic here
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
      .post("/books/create", data)
      .then((resp) => {
        toast.success("Book has been added.", {
          position: "top-right",
        });
        navigate("/homeadmin");
      })
      .catch((error) => {
        toast.success("Chech your input size.", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="container" style={{ minHeight: "499px" }}>
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
              required
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
              required
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
            required
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
            required
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
              required
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
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
