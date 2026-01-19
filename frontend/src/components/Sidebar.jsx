import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "fas fa-tachometer-alt",
      description: "Overview & Analytics",
    },
    {
      title: "Loan Records",
      url: "/loan-records",
      icon: "fas fa-file-alt",
      description: "Loan Management",
    },
    {
      title: "Legal Notices",
      url: "/legal-notices",
      icon: "fas fa-balance-scale",
      description: "Notice Management",
    },
    {
      title: "Loan Calculator",
      url: "/loan-calculator",
      icon: "fas fa-calculator",
      description: "Reduced Loan Calculation",
    },
    {
      title: "Interest Calculator",
      url: "/Interest-calculator",
      icon: "fas fa-calculator",
      description: "Interest Loan Calculation",
    },
  ];

  return (
    <div
      className={`sidebar bg-light border-end ${
        isCollapsed ? "collapsed" : ""
      }`}>
      {/* Logo Section */}
      <div className="p-3 border-bottom d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="app-logo bg-primary text-white rounded d-flex align-items-center justify-content-center me-3">
            ML
          </div>

          {!isCollapsed && (
            <div>
              <h6 className="mb-0 fw-bold">Money Lender</h6>
              <small className="text-muted">Financial Services</small>
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="p-md-3 p-0 position-absolute">
        <div className="list-group list-group-flush d-flex flex-row flex-md-column justify-content-between overflow-auto">

          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end
              className={({ isActive }) =>
                `list-group-item list-group-item-action border-0 rounded 
           flex-fill text-center text-md-start mb-md-3 
           ${isActive ? "active-nav" : ""}`
              }>
              {({ isActive }) => (
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <i className={`${item.icon} me-md-3 sidebar-icon`}></i>

                  {!isCollapsed && (
                    <div className="d-none d-md-block">
                      <div className="fw-medium">{item.title}</div>
                      <small
                        className={`opacity-75 ${
                          isActive ? "text-white" : "text-muted"
                        }`}>
                        {item.description}
                      </small>
                    </div>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
