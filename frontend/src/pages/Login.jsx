import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Function to send login notification email
  const sendLoginNotification = async (username) => {
    try {
      const formData = new FormData();
      formData.append("access_key", "b5399f4d-21d3-4292-83ad-37868549035c");
      formData.append("subject", `Successful Login Notification - ${username}`);
      formData.append("from_name", "Admin Panel");
      formData.append(
        "message",
        `User ${username} has successfully logged into the admin panel at ${new Date().toLocaleString()}.`,
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        console.log("Login notification email sent successfully");
      } else {
        console.error(
          "Failed to send login notification email:",
          result.message,
        );
      }
    } catch (err) {
      console.error("Error sending login notification email:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, password } = credentials;

    if (!username && !password) {
      setError("Please enter both username and password");
      return;
    } else if (!username) {
      setError("Please enter your username");
      return;
    } else if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      // Call the login API endpoint
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("username", username);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", "dummy_token");

        // Send login notification email
        await sendLoginNotification(username);

        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="login-bg">
      <div className="currency-bg">
        <span>₹</span>
        <span>$</span>
        <span>₹</span>
        <span>$</span>
        <span>₹</span>
        <span>$</span>
        <span>₹</span>
        <span>$</span>
      </div>

      <div className="container opacity">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card login-card shadow-lg border-0 rounded-4">
              <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
                <h2 className="fw-bold mb-2">Admin Login</h2>
                <p className="mb-0 opacity-75">
                  Secure access to admin dashboard
                </p>
              </div>

              <div className="card-body px-4 py-5">
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                      type="text"
                      className="form-control py-2"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4 position-relative">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-2 pe-5"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle position-absolute"
                      style={{
                        right: "15px",
                        top: "70%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#6c757d",
                        transition: "0.2s",
                      }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-2 mt-2 login-btn">
                      Login
                    </button>

                    <p className="mt-3 text-center">
                      <a
                        href="/forgot-password"
                        className="text-decoration-none fw-semibold">
                        Forgot Password?
                      </a>
                    </p>
                  </div>
                </form>
              </div>

              <div className="card-footer text-center py-3 bg-light rounded-bottom-4">
                <small className="text-muted">© 2025 Savkar Admin Panel</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
