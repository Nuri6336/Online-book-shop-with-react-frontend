import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import IndividualUser from "./IndividualUser";

const AdminViewUsers = () => {
  const [totalResult, setTotalResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const defaultDetailsUrl = "https://www.wikipedia.org/";
  const defaultLname = "Islam";
  const defaultName = "Tuhin";
  const defaultUrlToImage =
    "https://i0.wp.com/electrek.co/wp-content/uploads/sites/3/2023/05/electric-tanker-clean-energy.jpeg?resize=1200%2C628&quality=82&strip=all&ssl=1";

  //Fetching data Using Axios
  useEffect(() => {
    axiosInstance
      .get("/users/all")
      .then((resp) => {
        const booksData = resp.data;
        setTotalResult(booksData);
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
                <IndividualUser
                  fname={element.firstName || defaultName}
                  lname={element.lastName || defaultLname}
                  email={element.email || defaultUrlToImage}
                  address={element.address || defaultDetailsUrl}
                  userId={element.userId}
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

export default AdminViewUsers;
