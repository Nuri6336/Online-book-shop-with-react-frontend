import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/book.css";
import { useState } from "react";
import "../css/adminviewusers.css";
import UserModal from "./UserModal";
import { Link } from "react-router-dom";

const IndividualUser = ({ fname, lname, email, address, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-3">
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row">
            {/* <div className="col-sm-6"></div> */}
            <div className="list list-row block">
              <div className="list-item" data-id="19">
                <div>
                  <Link to="#" data-abc="true" onClick={openModal}>
                    <span className="w-48 avatar gd-warning">{fname[0]}</span>
                  </Link>
                </div>
                <UserModal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  userId={userId}
                />
                <div className="flex">
                  <Link
                    to="#"
                    className="item-author text-color"
                    data-abc="true"
                    onClick={openModal}
                  >
                    {fname}
                  </Link>
                  <div className="item-except text-muted text-sm h-1x">
                    {email}
                  </div>
                </div>
                <div className="no-wrap">
                  <div className="item-date text-muted text-sm d-none d-md-block">
                    13/12/18
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualUser;
