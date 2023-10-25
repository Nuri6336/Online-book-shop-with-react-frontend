import Footer from "../../components/Footer";
import BorrowedBookList from "../../components/user/BorrowedBookList";
import NavberUser from "../../components/user/NavberUser";

const BorrowedDetails = () => {
  return (
    <>
      <NavberUser />
      <BorrowedBookList />
      <Footer />
    </>
  );
};

export default BorrowedDetails;
