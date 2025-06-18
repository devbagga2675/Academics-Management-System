import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn)
  if (!isLoggedIn) return <Navigate to="/signin" />;
  return <Outlet />;
};

export default PrivateRoute;
