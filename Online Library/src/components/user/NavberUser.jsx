import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";

const NavberUser = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    axiosInstance
      .get("/books/all")
      .then((resp) => {
        resp.data.map((element) => {
          if (element.bookName.toUpperCase() === searchQuery.toUpperCase()) {
            const bookId = element.id;
            navigate(`/bookdetailspage/${bookId}`);
          }
        });
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.log("Error Response Data:", errorMessage);
        }
      });
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="#">
          <FontAwesomeIcon icon={faBook} />
          <img
            src="../src/assets/sacred.png"
            alt="Sacred"
            style={{ height: "40px", width: "60px", marginLeft: "10px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/homeuser">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/borrowedbooks">
                Borrowed books<span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <div
            className="input-group"
            style={{ width: "20%", marginRight: "50px" }}
          >
            <input
              type="search"
              id="search-input"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery} // Value binds to the searchQuery state
              onChange={handleInputChange} // onChange event handler
              onKeyPress={handleKeyPress} // Handle Enter key press
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavberUser;
