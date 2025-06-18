import React from "react";
import { Tooltip, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

const LogTag = ({ label, status, date, by }) => {
  const tooltipContent =
    status && date && by ? (
      <>
        on: {date}
        <br />
        by: {by}
      </>
    ) : null;

  return (
    <Tooltip disableFocusListener title={tooltipContent}>
      <Typography
        variant="body2"
        color={status ? "primary" : "white"}
        sx={{
          backgroundColor: status ? "#EFE9FD" : "lightgray", 
          padding: "4px 8px",
          borderRadius: "4px",
          fontWeight: '600'
        }}
        noWrap
      >
        {status && 
        <Check sx={{
            fontSize: '12px',
            mr: 1
        }}/>}
        {label}
      </Typography>
    </Tooltip>
  );
};

export default LogTag;