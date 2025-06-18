import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Optional: Add a back arrow icon

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={handleGoBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
