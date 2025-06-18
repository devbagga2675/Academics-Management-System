import React from "react";

//component imports
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

function DashboardSTU() {
  return (
    <div style={{width:"100%"}}>
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
    </div>
  );
}

export default DashboardSTU;