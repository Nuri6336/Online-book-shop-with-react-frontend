import { Navigate, Outlet } from "react-router-dom";

const Authenticate = () => {
  const token = localStorage.getItem("token");

  return <div>{token ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default Authenticate;
