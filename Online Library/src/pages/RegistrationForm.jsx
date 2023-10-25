import React from "react";
import { Form, Button } from "react-bootstrap";
import "../css/registrationform.css";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  };

  const [formData, setFormData] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/users/register", formData)
      .then((resp) => {
        toast.success("Registration successful!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
        });
      });
  };

  return (
    <>
      <div className="register-container">
        <div className="registration-form">
          <h3>Registration Form</h3>
          <Form onSubmit={handleSubmit} className="main-form">
            <Form.Group controlId="firstName">
              <Form.Label className="label">First Name</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="firstName"
                placeholder="Abu Taeb"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label className="label">Last Name</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="lastName"
                placeholder="Nuri"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="label">Email</Form.Label>
              <Form.Control
                className="input"
                type="email"
                name="email"
                placeholder="taeb@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label className="label">Address</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="address"
                placeholder="Dhaka-12354"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                className="input"
                type="password"
                name="password"
                placeholder="..........."
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <p
              style={{
                marginTop: "18px",
                marginBottom: "-19px",
                color: "white",
              }}
            >
              Already registered{" "}
              <Link
                to="/"
                className="login-link"
                style={{
                  color: "wheat",
                }}
              >
                Click here
              </Link>{" "}
              to Login{" "}
            </p>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
