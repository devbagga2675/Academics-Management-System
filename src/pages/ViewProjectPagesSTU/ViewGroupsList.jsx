import {
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ProjectGroupCardSTU from "../../components/ProjectGroupCardSTU";
import api from "../../components/api";

function ViewGroupsList() {
  const userId = "your-user-id";

  const tempDummy = [
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "167",
      id: "P102",
      type: "Minor Project II",
      course: "B.Tech ECE",
      title: "IoT-Based Smart Home Automation System",
      status: "completed",
      guide: "Prof. R. P. Sharma",
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: true },
      ],
    },
    {
      project_id: "168",
      id: "P103",
      type: "Major Project II",
      course: "B.Tech ME",
      title: "Robotics Arm Design and Control",
      status: "ongoing",
      guide: "Dr. S. N. Verma",
      components: [
        { title: "Mid Semester Grading", evaluation_done: false },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "169",
      id: "P104",
      type: "Industry Internship",
      course: "B.Tech EE",
      title: "Power Grid Optimization using Machine Learning",
      status: "completed",
      guide: "Prof. G. P. Yadav",
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: true },
      ],
    },
    {
      project_id: "170",
      id: "P105",
      type: "Dissertation II",
      course: "M.Tech CSE",
      title: "Cloud Security Analysis and Implementation",
      status: "ongoing",
      guide: "Dr. K. M. Gupta",
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    // ... Other entries follow the same pattern with unique project_id and components
  ];

  const [projectData, setProjectData] = useState(tempDummy);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch API Data (Currently Disabled)
  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.post("/dummy/sendUserId", { userId });
        if (response.data.Status === "SUCCESS") {
          setProjectData(response.data.Data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchProjectData();
  }, [userId]);

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ width: "100%", alignItems: "flex-start" }}
    >
      <Typography variant="h5" fontWeight="bold">
        Project Groups
      </Typography>
      <Stack direction="row">
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">
            Error loading data: {error.message}
          </Typography>
        ) : (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
            sx={{ width: "fit-content",  alignItems: 'stretch' }}
          >
            {projectData?.map((project) => (
              <ProjectGroupCardSTU key={project.id} {...project} />
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default ViewGroupsList;