import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication on component mount
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    // Prevent going back after logout
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center navbar-brand-section">
          <h4 className="ms-3">Money Lending Dashboard</h4>
        </div>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
