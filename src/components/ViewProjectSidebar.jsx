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
// BackButton would be placed elsewhere for this layout.

const ViewProjectSidebar = ({ projectData }) => {
  // Define a professional and cohesive color palette
  const palette = {
    // A cool, muted base color for the main background
    primary: '#1D2A3B',
    // A slightly lighter shade for elements that stand out slightly
    secondary: '#2B394A',
    // A bright but sophisticated accent color for highlights and active states
    accent: '#4FD1C5',
    // A light text color that provides excellent contrast on the dark background
    textLight: '#E8F3F1',
    // A medium text color for secondary information or icons
    textMuted: '#A0B1B0',
    // A subtle border color for separation
    borderSubtle: '#4A5C6B',
  };

  return (
    <Box
      sx={{
        background: palette.primary,
        maxWidth: "250px",
        position: "fixed",
        borderRight: `1px solid ${palette.borderSubtle}`,
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        padding: 2,
        paddingLeft: 0,
        gap: 2,
        color: palette.textLight,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {/* Project Heading - uses the light text color */}
        <ProjectHeading title={projectData.title} />

        {/* Project Tags - use the secondary background and muted text for less prominence */}
        <ProjectTag
          label={projectData.type}
          sx={{ background: palette.secondary, color: palette.textMuted }}
        />
        <ProjectTag
          label={projectData.id}
          sx={{ background: palette.secondary, color: palette.textMuted }}
        />
        <ProjectTag
          label={projectData.course}
          sx={{ background: palette.secondary, color: palette.textMuted }}
        />
      </Box>

      <Divider sx={{ borderColor: palette.borderSubtle }} />

      <Stack spacing={1} sx={{ width: "100%", paddingLeft: 2, paddingRight: 2 }}>
        {/* Side Nav Links - use muted text for icons and accent for active state (handled within SideNavLink) */}
        <SideNavLink to="logbook" end sx={{
          "& .MuiSvgIcon-root": { color: palette.textMuted },
          // The active state would use the accent color, e.g.,
          // "&.active": { color: palette.accent }
        }}>
          <EditNote />
          Log Book
        </SideNavLink>
        <SideNavLink to="evaluation" sx={{ "& .MuiSvgIcon-root": { color: palette.textMuted } }}>
          <ChecklistRtl />
          Evaluation
        </SideNavLink>
        <SideNavLink to="people" sx={{ "& .MuiSvgIcon-root": { color: palette.textMuted } }}>
          <SupervisorAccountOutlined />
          People
        </SideNavLink>
        <SideNavLink to="projecttimeline" sx={{ "& .MuiSvgIcon-root": { color: palette.textMuted } }}>
          <CalendarMonthOutlined />
          Project Timeline
        </SideNavLink>
      </Stack>
    </Box>
  );
};

export default ViewProjectSidebar;