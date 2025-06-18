import React from "react";
import { Box, Stack, Divider } from "@mui/material";
import ProjectTag from "./../components/ProjectTag";
import ProjectHeading from "./../components/ProjectHeading";
import SideNavLink from "../components/SideNavLink";
import {
  CalendarMonthOutlined,
  ChecklistRtl,
  EditNote,
  SupervisorAccountOutlined,
} from "@mui/icons-material";
import BackButton from "./BackButton";

const ViewProjectSidebar = ({ projectData }) => {
  console.log(projectData.id);
  return (
    <Box
      sx={{
        background: '#ffffff',
        maxWidth: "250px",
        position: "fixed",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        padding: 2,
        paddingLeft: 0,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <ProjectHeading title={projectData.title} />
        <ProjectTag label={projectData.type} />
        <ProjectTag label={projectData.id} />
        <ProjectTag label={projectData.course} />
      </Box>
      <Divider />
      <Stack spacing={1} sx={{ width: "100%" }}>
        <SideNavLink to="logbook" end>
          <EditNote />
          Log Book
        </SideNavLink>
        <SideNavLink to="evaluation">
          <ChecklistRtl />
          Evaluation
        </SideNavLink>
        <SideNavLink to="people">
          <SupervisorAccountOutlined />
          People
        </SideNavLink>
        <SideNavLink to="projecttimeline">
          <CalendarMonthOutlined />
          Project Timeline
        </SideNavLink>
      </Stack>
    </Box>
  );
};

export default ViewProjectSidebar;
