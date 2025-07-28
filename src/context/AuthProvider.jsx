import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn === "true"; // Simplified boolean conversion
  });
  
  const [userType, setUserType] = useState('faculty');
  const [userMeta, setUserMeta] = useState({
    email: 'dev@gmail.com',
    userType: 'faculty',
    userDesignation: 'dean'
  })
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);
    userMeta.userType === 'faculty' ? navigate('/facultydashboard') : userType === 'admin' ? navigate("/admindashboard") : navigate("/studentdashboard")

    // try {
    //   const response = await axios.post("/api/loginPost", {
    //     user_email_address: email,
    //     login_password: password,
    //   });

    //   if (response.data.Status === "SUCCESS") {
    //     setIsLoggedIn(true);
    //     localStorage.setItem("isLoggedIn", "true");
    //     navigate("/studentdashboard");
    //   } else if (response.status === 404) {
    //     console.error("Login failed: Resource not found");
    //   } else {
    //     console.error("Login failed:", response.data);
    //   }
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
  };

  const logout = () => {
    console.log("Logout function in AuthProvider is being called");
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userType, setUserType, userMeta }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;