import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet, redirect } from "react-router-dom";

function ProtectedPages({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedPages;
