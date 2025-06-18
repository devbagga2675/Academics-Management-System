import {
  Typography,
  Stack,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Card,
  Autocomplete,
  TextField,
  Box
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import ProjectGroupCardFAC from "../../components/ProjectGroupCardFAC";
import { Tune } from "@mui/icons-material";
import api from "../../components/api";

function ViewGroupsListFAC() {
  const userId = localStorage.getItem("userId");
  const allTypes = [
    "Minor Project II",
    "Major Project II",
    "Dissertation II",
    "Industry Internship",
  ];

  const tempDummy = [
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    {
      project_id: "166",
      id: "P101",
      type: "Major Project II",
      course: "B.Tech CSE",
      title: "AI-Powered Recommendation System",
      status: "ongoing",
      guide: "Dr. A. K. Singh",
      isExternal: false,
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
      isExternal: false,
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
      isExternal: false,
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
      isExternal: false,
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
      isExternal: false,
      components: [
        { title: "Mid Semester Grading", evaluation_done: true },
        { title: "End Semester Grading", evaluation_done: false },
      ],
    },
    // ... Other entries follow the same pattern
  ];

  const [projectData, setProjectData] = useState(tempDummy);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGuide, setShowGuide] = useState(true);
  const [showExternal, setShowExternal] = useState(true);
  const [activeSection, setActiveSection] = useState("Guide");
  const [courseFilter, setCourseFilter] = useState(null);
  const [titleFilter, setTitleFilter] = useState(null);
  const [groupFilter, setGroupFilter] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const response = await api.post("/fetchProjectsByUserId", {
          user_id: userId,
        });
        if (response?.data) {
          setShowGuide(!!response.data.guide);
          setShowExternal(!!response.data.external);
          const guideProjects = (response.data.guide_projects || []).map(
            (project) => ({
              ...project,
              isExternal: false,
              components: project.components || [
                { title: "Mid Semester Grading", evaluation_done: false },
                { title: "End Semester Grading", evaluation_done: false },
              ],
            })
          );
          const externalProjects = (response.data.external_projects || []).map(
            (project) => ({
              ...project,
              isExternal: true,
              components: project.components || [
                { title: "Mid Semester Grading", evaluation_done: false },
                { title: "End Semester Grading", evaluation_done: false },
              ],
            })
          );
          setProjectData([...guideProjects, ...externalProjects]);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchProjectData();
  }, [userId]);

  // Memoized unique values for performance
  const uniqueCourses = useMemo(
    () => [...new Set(projectData.map((p) => p.course))].sort(),
    [projectData]
  );
  const uniqueTitles = useMemo(
    () => [...new Set(projectData.map((p) => p.title))].sort(),
    [projectData]
  );
  const uniqueGroups = useMemo(
    () => [...new Set(projectData.map((p) => p.id))].sort(),
    [projectData]
  );

  useEffect(() => {
    const isExternal = activeSection === "External";
    const filtered = projectData.filter(
      (p) =>
        p.isExternal === isExternal &&
        (selectedTypes.length === 0 || selectedTypes.includes(p.type)) &&
        (!courseFilter || p.course === courseFilter) &&
        (!titleFilter ||
          p.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
        (!groupFilter || p.id === groupFilter)
    );
    setFilteredProjects(filtered);
  }, [
    projectData,
    activeSection,
    selectedTypes,
    courseFilter,
    titleFilter,
    groupFilter,
  ]);

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setCourseFilter(null);
    setTitleFilter(null);
    setGroupFilter(null);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    handleClearFilters();
  };

  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} alignItems="start">
        <Box
          sx={{
            position: "sticky",
            top: 64, // Adjust based on TopBar height (assuming 64px)
            zIndex: 1,
            width: 250, // Matches minWidth: "200px" of Card + padding
            alignSelf: "flex-start",
          }}
        >
          <Stack direction="column" spacing={2} className="filter-group">
            <Stack direction="row" alignItems="center" gap={1} width="100%">
              <Button
                variant={activeSection === "Guide" ? "contained" : "outlined"}
                disabled={!showGuide}
                onClick={() => handleSectionClick("Guide")}
                sx={{ flexGrow: 1 }}
              >
                Guide
              </Button>
              <Button
                variant={activeSection === "External" ? "contained" : "outlined"}
                disabled={!showExternal}
                onClick={() => handleSectionClick("External")}
                sx={{ flexGrow: 1 }}
              >
                External
              </Button>
            </Stack>
            <Card variant="outlined" sx={{ minWidth: "200px" }}>
              <Stack direction="column" alignItems="start" p={2}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Tune sx={{ color: "#777777" }} />
                  <Typography variant="body1" color="#777777">
                    Filters:
                  </Typography>
                </Stack>
                <FormGroup>
                  {allTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={selectedTypes.includes(type)}
                          onChange={handleFilterChange}
                          value={type}
                        />
                      }
                      label={type}
                      sx={{ whiteSpace: "nowrap" }}
                    />
                  ))}
                </FormGroup>
                {(selectedTypes.length > 0 ||
                  courseFilter ||
                  titleFilter ||
                  groupFilter) && (
                  <Button size="small" onClick={handleClearFilters}>
                    Clear All
                  </Button>
                )}
              </Stack>
            </Card>
            <Stack
              direction="column"
              alignItems="start"
              sx={{ flexWrap: "wrap", gap: 2 }}
            >
              <Autocomplete
                options={uniqueCourses}
                value={courseFilter}
                onChange={(e, newValue) => setCourseFilter(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Course"
                    variant="outlined"
                    size="small"
                  />
                )}
                sx={{ width: "100%" }}
                disableClearable={false}
              />
              <Autocomplete
                options={uniqueTitles}
                value={titleFilter}
                onChange={(e, newValue) => setTitleFilter(newValue)}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Project Title"
                    variant="outlined"
                    size="small"
                  />
                )}
                sx={{ width: "100%" }}
                disableClearable={false}
              />
              <Autocomplete
                options={uniqueGroups}
                value={groupFilter}
                onChange={(e, newValue) => setGroupFilter(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Group Number"
                    variant="outlined"
                    size="small"
                  />
                )}
                sx={{ width: "100%" }}
                disableClearable={false}
              />
            </Stack>
          </Stack>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">
            Error loading data: {error.message} (Showing dummy data)
          </Typography>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={2} alignItems="stretch">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectGroupCardFAC
                  key={project.id}
                  {...project}
                  components={project.components}
                />
              ))
            ) : (
              <Typography>
                No projects found. Try adjusting the filters.
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default ViewGroupsListFAC;