import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UseCustomHooks = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    axiosInstance
      .post("/users/login", data)
      .then((resp) => {
        const token = resp.data.Authorization;
        const id = resp.data.id;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        toast.success("Successfully logged in.", {
          position: "top-right",
        });
        if (resp.data.role === "ADMIN") {
          navigate("/homeadmin");
        } else {
          navigate("/homeuser");
        }
      })
      .catch((error) => {
        setError(true);
        toast.error("Invalid credentials!", {
          position: "top-right",
        });
      });
  };

  return {
    handleChange,
    handleSubmit,
    error,
    formData,
  };
};

export default UseCustomHooks;
