import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Outlet, NavLink, useParams } from "react-router-dom";
import ProjectTag from "../../components/ProjectTag";
import ProjectHeading from "../../components/ProjectHeading";
import SideNavLink from "../../components/SideNavLink";
import {
  Assignment,
  CalendarMonth,
  CalendarMonthOutlined,
  ChecklistRtl,
  EditNote,
  MenuBook,
  NoteAlt,
  SupervisorAccountOutlined,
} from "@mui/icons-material";
import ViewProjectSidebar from "../../components/ViewProjectSidebar";
import { useMutation } from "@tanstack/react-query";
import api from "../../components/api";
export const ProjectContext = createContext(0);

function ViewProjectFAC() {
  const param = useParams();

  const [projectData, setProjectData] = useState({
    id: "P102",
    type: "Minor Project",
    course: "B.Tech Electronics",
    title: "IoT-Based Smart Home Automation System",
    status: "completed",
    guide: "Prof. R. P. Sharma",
  });

  const fetchProject = useMutation({
    mutationFn: async (id) => {
      const response = await api.post(`/logs/`, { id });
      return response.data;
    },
    onSuccess: (data) => {
      setProjectData(data.Data[0]);
    },
    onError: () => {},
  });

  useEffect(() => {
    fetchProject.mutate(param.id);
    return () => {};
  }, []);

  // if (fetchProject.isPending) {
  //   return <CircularProgress />;
  // }

  // if (fetchProject.isError) {
  //   return <p>Error loading project</p>;
  // }

  return (
    <ProjectContext.Provider value={projectData}>
      <Box sx={{ display: "flex", minWidth: "100%", maxHeight: "100%" }}>
        <ViewProjectSidebar projectData={projectData} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: 2,
            marginLeft: "250px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ProjectContext.Provider>
  );
}

export default ViewProjectFAC;
