import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const toggleVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, newPassword, confirmPassword } = form;

    if (!username || !newPassword || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await response.json();

      if (!data.success) {
        setMessage(data.message || "Password reset failed");
        return;
      }

      setMessage("✅ Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="fw-bold">Forgot Password</h2>
            </div>

            <div className="card-body px-4 py-5">
              {message && (
                <div
                  className={`alert ${
                    message.includes("✅")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-4">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                {/* New Password */}
                <div className="mb-4 position-relative">
                  <label className="form-label">New Password</label>
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    className="form-control pe-5"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => toggleVisibility("newPassword")}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "70%",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="mb-4 position-relative">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    className="form-control pe-5"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => toggleVisibility("confirmPassword")}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "70%",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button className="btn btn-primary w-100">
                  Reset Password
                </button>
                <p className="mt-3 text-center">
                      <a
                        href="/login"
                        className="text-decoration-none fw-semibold">
                          Go to Login
                      </a>
                    </p>
              </form>
            </div>

            <div className="card-footer text-center">
              <small>© 2025 Savkar Admin Panel</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
