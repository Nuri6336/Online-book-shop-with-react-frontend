import "../css/notfoundpage.css";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFoundPage = () => {
  return (
    <div className="container not-found">
      <div className="row">
        <div className="col-md-12">
          <div className="text-center mt-5">
            <h1>
              <FontAwesomeIcon className="spinner-icon" icon={faGears} />
              404 - Not Found
            </h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
