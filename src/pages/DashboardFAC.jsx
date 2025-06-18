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
        paddingInline={2}
        paddingTop={1}
        direction={"column"}
        sx={{ paddingTop: "72px", width: "100vw" }}
      >
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardFAC;
