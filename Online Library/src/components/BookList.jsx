import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import Book from "./Book";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList = () => {
  const [totalResult, setTotalResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const defaultDetailsUrl = "https://www.wikipedia.org/";
  const defaultDescription = "This is the default description for news";
  const defaultTitle = "Secret of silicon vally";
  const defaultUrlToImage =
    "https://edit.org/images/cat/book-covers-big-2019101610.jpg";

  //Fetching data Using Axios
  useEffect(() => {
    axiosInstance
      .get("/books/all")
      .then((resp) => {
        // console.log("The Response", resp);
        const booksData = resp.data;
        const keyCount = Object.keys(booksData).length;
        setTotalResult(booksData);
        // console.log(keyCount);
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.log("Error Response Data:", errorMessage);
        } else {
          // Handle other types of errors
        }
      });
  }, []);

  const handleDelete = (bookId) => {
    axiosInstance
      .delete(`/books/delete/${bookId}`)
      .then((resp) => {
        setTotalResult((prevBooks) =>
          prevBooks.filter((book) => book.id !== bookId)
        );
        toast.success("Book has been deleted.", {
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error("Book has benn borrowed by someone.", {
          position: "top-right",
        });
      });
  };

  // Calculate the index of the last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentItems = totalResult.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle changing the page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="row-class" style={{ minHeight: "499px" }}>
      <div className="container my-3 container-news ">
        <div className="row" style={{ minHeight: "499px" }}>
          {currentItems &&
            currentItems.map((element) => (
              <div className="col-md-4" key={element.id}>
                <Book
                  title={element.bookName || defaultTitle}
                  description={element.bookDescription || defaultDescription}
                  imageUrl={element.imgUrl || defaultUrlToImage}
                  details={element.detailsUrl || defaultDetailsUrl}
                  bookId={element.id}
                  onDelete={handleDelete}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            type="button"
            className="btn btn-dark"
            style={{ width: "163px" }}
          >
            &larr; Previous
          </button>
          <button
            disabled={indexOfLastItem >= totalResult.length}
            onClick={() => paginate(currentPage + 1)}
            type="button"
            className="btn btn-dark"
            style={{ width: "163px" }}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
