import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, userType } = useAuth();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching user data
      const simulatedData = {
        email: "dev.n.bagga@nuv.ac.in",
        name: "Dev Bagga",
      };
      setUserData(simulatedData);
    };

    fetchData();
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleResetPassword = () => {
    navigate("/resetpassword");
    handleMenuClose();
  };

  const handleSignOut = () => {
    logout();
    handleMenuClose();
  };

  const handleGoHome = () => {
    if (userType === "faculty") {
      navigate("/facultydashboard");
    } else {
      navigate("/studentdashboard");
    }
  };

  // Get the initial from userData.name
  const getInitial = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #DCE1F0",
        width: "100%",
      }}
      elevation={false}
    >
      <Toolbar>
        <IconButton
          color="primary"
          onClick={handleGoHome}
          sx={{ marginRight: 2 }}
        >
          <HomeIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        {userData && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mx: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              Welcome,{" "}
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                {userData.name}
              </Typography>
              !
            </Typography>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            >
              {getInitial(userData.name)}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;