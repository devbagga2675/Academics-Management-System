import React from "react";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

const DashboardFAC = () => {
  return (
    <>
      <Topbar />
      <Stack
        spacing={2}
        direction={"column"}
        sx={{ paddingTop: "65px", width: "100vw" }}
      >
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardFAC;
