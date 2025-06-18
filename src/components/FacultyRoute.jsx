import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const FacultyRoute = () => {
  const user = useAuth();
  console.log(user.userType)
  if (user.userType != 'faculty'){
    user.logout()
  };
  return <Outlet />;
}

export default FacultyRoute