import React from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { Construction as ConstructionIcon } from "@mui/icons-material";
import waiting_image from './../assets/image.png'
function ComingSoon() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px", // Adjust as needed
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <ConstructionIcon
        sx={{
          fontSize: "3rem",
          color: theme.palette.primary.main,
          marginBottom: theme.spacing(2),
        }}
      />
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          textAlign: "center",
          marginBottom: theme.spacing(3),
        }}
      >
        This section is currently <b>under development</b>  and will be available soon.
      </Typography>
      <img src={waiting_image}/>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          marginTop: theme.spacing(2),
          fontStyle: "italic",
        }}
      >
        We appreciate your patience.
      </Typography>
    </Box>
  );
}

export default ComingSoon;