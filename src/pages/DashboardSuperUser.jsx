import React from "react";
import { Stack } from "@mui/material";
import TopBar from "../components/Topbar";
import SideNavigation from "./DashboardSuperUserComponents/SideNavigation";
import { Outlet } from "react-router-dom";
const DashboardSuperUser = () => {
  return (
    <div style={{ width: "100%" }}>
      <TopBar />

      <Stack
        spacing={2}
        paddingInline={2}
        paddingTop={1}
        direction={"row"}
        sx={{ paddingTop: "72px", width: "100vw" }}
      >
        <SideNavigation />
        <Outlet/>
      </Stack>
    </div>
  );
};

export default DashboardSuperUser;
