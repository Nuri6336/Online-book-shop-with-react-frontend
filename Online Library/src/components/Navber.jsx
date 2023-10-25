import { imageUrl } from "../constants/imageUrl";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

const Navber = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="#">
          <FontAwesomeIcon icon={faBook} />
          <img
            src={imageUrl.urlNine}
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
              <Link className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/homeadmin">
                Books<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addbook">
                Add Book<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminviewusers">
                User<span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
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

export default Navber;
