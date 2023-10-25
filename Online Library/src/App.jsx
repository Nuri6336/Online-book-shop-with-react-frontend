import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import HomeAdmin from "./pages/HomeAdmin";
import AddBookAdmin from "./pages/AddBookAdmin";
import AdminUsers from "./pages/AdminUsers";
import Home from "./pages/Home";
import HomeUser from "./pages/user/HomeUser";
import Login from "./pages/Login";
import BookDetailsPage from "./pages/user/BookDetailsPage";
import BorrowedDetails from "./pages/user/BorrowedDetails";
import RegistrationForm from "./pages/RegistrationForm";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<RegistrationForm />}></Route>
          <Route element={<Authenticate />}>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/homeadmin" element={<HomeAdmin />}></Route>
            <Route exact path="/addbook" element={<AddBookAdmin />}></Route>
            <Route
              exact
              path="/borrowedbooks"
              element={<BorrowedDetails />}
            ></Route>
            <Route
              exact
              path="/adminviewusers"
              element={<AdminUsers />}
            ></Route>
            <Route exact path="/homeuser" element={<HomeUser />}></Route>
            <Route
              exact
              path="/bookdetailspage/:bookId"
              element={<BookDetailsPage />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
