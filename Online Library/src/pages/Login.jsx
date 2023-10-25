import { Link } from "react-router-dom";
import { imageUrl } from "../constants/imageUrl";
import "../css/login.css";
import UseCustomHooks from "../hooks/useCustomHooks";

function Login() {
  const { handleChange, handleSubmit, error, formData } = UseCustomHooks();

  return (
    <>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-5">
                <img
                  src={imageUrl.urlOne}
                  alt="login"
                  className="login-card-img"
                />
                <p className="text-white font-weight-medium text-center flex-grow align-self-end footer-link text-small">
                  Online{" "}
                  <Link
                    to="https://www.islamicboisomahar.in/bangla-islamic-books/"
                    target="_blank"
                    className="text-white"
                    rel="noreferrer"
                  >
                    Pdf For Islamic Books
                  </Link>{" "}
                  from Boishamahar
                </p>
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <div className="brand-wrapper">
                    <img src={imageUrl.urlTwo} alt="logo" className="logo" />
                    <p className="logo-p">Online Library</p>
                  </div>
                  <p className="login-card-description">
                    Sign into your account
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="***********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <input
                      name="login"
                      id="login"
                      className="btn btn-block login-btn mb-4"
                      type="submit"
                      value="Login"
                    />
                  </form>
                  <Link to="/" className="forgot-password-link">
                    Forgot password?
                  </Link>
                  <p className="login-card-footer-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-reset">
                      Register here
                    </Link>
                  </p>
                  <nav className="login-card-footer-nav">
                    <Link to="/">Terms of use.</Link>
                    <Link to="/">Privacy policy</Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
