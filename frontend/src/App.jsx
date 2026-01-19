import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import LoanRecords from "./pages/LoanRecords";
import LegalNotices from "./pages/LegalNotices";
import LoanCalculator from "./pages/LoanCalculator";
import InterestCalculator from "./pages/InterestCalculator";
import Login from "./pages/Login";
import CustomerProfile from "./pages/CustomerProfile";
import ForgotPassword from "./pages/ForgetPassword";

import "./App.css";

const queryClient = new QueryClient();

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// 📐 Layout
const AppLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 🔥 HASH ROUTER FIX */}
      <HashRouter>
        <Routes>

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loan-records" element={<LoanRecords />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/interest-calculator" element={<InterestCalculator />} />
            <Route path="/profile/:id" element={<CustomerProfile />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
