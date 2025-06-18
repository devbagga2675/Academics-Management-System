import React from "react";
import { Box, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HistoryIcon from "@mui/icons-material/History";
import SideNavLink from "../../components/SideNavLink";
import { ListItemIcon, Typography } from "@mui/material";

const SideNavigation = () => {
  return (
    <Box
      sx={{
        background: "#ffffff",
        width: "208px",
        position: "fixed",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        padding: 2,
        paddingLeft: 0,
        gap: 2,
        zIndex: "9999",
      }}
    >
      <Stack spacing={1} sx={{ width: "100%" }}>
        <SideNavLink to="/admindashboard" end>
          <DashboardIcon fontSize="small" />
          Dashboard
        </SideNavLink>
        <SideNavLink to="reports">
          <AssessmentIcon fontSize="small" />
          Reports
        </SideNavLink>
        <SideNavLink to="activitylogs">
          <HistoryIcon fontSize="small" />
          Activity Logs
        </SideNavLink>
      </Stack>
    </Box>
  );
};

export default SideNavigation;
