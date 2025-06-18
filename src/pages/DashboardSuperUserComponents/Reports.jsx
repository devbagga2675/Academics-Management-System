import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";
import TitleBar from "../../components/TitleBar";
import axios from "axios";
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create QueryClient
const queryClient = new QueryClient();

function Reports() {
  const [reportData, setReportData] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [allColumnsByReportType, setAllColumnsByReportType] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Define mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (apiEndpoint) =>
      api.post(apiEndpoint, {}).then((res) => res.data),
    onSuccess: (apiResponse) => {
      console.log(`API Response for ${selectedReport.label}:`, apiResponse);

      if (apiResponse.status === "success" && apiResponse.data) {
        const dataByReportType = {};
        const columnsByReportType = {};

        // Map all table headings
        Object.entries(apiResponse.data).forEach(([reportType, report]) => {
          dataByReportType[reportType] = report.rows;
          columnsByReportType[reportType] = report.columnHeaders.map(
            (field) => ({
              field,
              headerName: field,
              flex:
                field === "project_title" || field === "course_name" ? 2 : 1,
              sortable: true,
              renderHeader: (params) => (
                <div style={{ whiteSpace: "normal", textAlign: "center" }}>
                  {params.colDef.headerName}
                </div>
              ),
            })
          );
        });

        setReportData(dataByReportType);
        setAllColumnsByReportType(columnsByReportType);
        setSnackbar({
          open: true,
          message: `Successfully loaded report data`,
          severity: "success",
        });
      } else {
        throw new Error("Invalid API response format");
      }
    },
    onError: (error) => {
      console.error(`API Error for ${selectedReport.label}:`, error.message);
      setSnackbar({
        open: true,
        message: "Failed to load report data",
        severity: "error",
      });
      setReportData({});
      setAllColumnsByReportType({});
    },
  });

  const reports = [
    {
      label: "Cumulative Report",
      icon: <BookIcon />,
      apiEndpoint: "/api/cumulative-report",
    },
    {
      label: "Student Delays",
      icon: <AccessTimeIcon />,
      apiEndpoint: "/api/student-delays",
    },
    {
      label: "Teacher Delays",
      icon: <AccessTimeIcon />,
      apiEndpoint: "/api/teacher-delays",
    },
    {
      label: "Student Report Card",
      icon: <SchoolIcon />,
      apiEndpoint: "/api/student-report-card",
    },
    {
      label: "Project Report Card",
      icon: <BookIcon />,
      apiEndpoint: "/api/project-report-card",
    },
    {
      label: "Session Report",
      icon: <AssignmentTurnedInIcon />,
      apiEndpoint: "/api/session-report",
    },
    {
      label: "Change Report",
      icon: <AssignmentTurnedInIcon />,
      apiEndpoint: "/api/change-report",
    },
    {
      label: "Faculty Grade Report",
      icon: <SchoolIcon />,
      apiEndpoint: "/api/faculty-grade-report",
    },
  ];

  const handleReportClick = (label, apiEndpoint) => {
    setSelectedReport({ label, apiEndpoint });
    mutate(apiEndpoint);
  };

  const handleClearSelection = () => {
    setSelectedReport(null);
    setReportData({});
    setAllColumnsByReportType({});
    setSnackbar({ open: false, message: "", severity: "info" });
  };

  const handleDownload = () => {
    alert("Excel download triggered!");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 2, paddingLeft: "208px", width: "100%" }}>
      <TitleBar title="Reports" />
      <Box>
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
          {reports.map((report) => (
            <Button
              key={report.label}
              variant="contained"
              startIcon={report.icon}
              sx={{ minWidth: 180 }}
              onClick={() =>
                handleReportClick(report.label, report.apiEndpoint)
              }
            >
              {report.label}
            </Button>
          ))}
        </Box>

        {selectedReport && (
          <Stack direction="row" spacing={2} mb={2}>
            <Typography variant="h6">
              Showing: {selectedReport.label}
            </Typography>
            <Tooltip title="Reset View">
              <Button
                variant="outlined"
                color="warning"
                startIcon={<RestartAltIcon />}
                onClick={handleClearSelection}
              >
                Reset
              </Button>
            </Tooltip>
            <Tooltip title="Download Excel">
              <Button
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
              >
                Download
              </Button>
            </Tooltip>
          </Stack>
        )}

        {isPending ? (
          <Box mt={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          Object.keys(reportData).length > 0 &&
          Object.entries(reportData).map(([reportType, rows]) => (
            <Box key={reportType} mb={4}>
              <Typography variant="h6" gutterBottom>
                {reportData[reportType][0]
                  ? reportData[reportType][0].tableHeader
                  : reportType}
              </Typography>
              <Box sx={{ width: "100%", overflow: "hidden" }}>
                <DataGrid
                  rows={rows}
                  columns={allColumnsByReportType[reportType]}
                  getRowHeight={() => "auto"}
                  sx={{
                    width: "100%",
                    border: "1px solid rgba(224, 224, 224, 1)",
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      whiteSpace: "normal",
                      lineHeight: "1.2em",
                      height: "fit-content",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      whiteSpace: "normal",
                      lineHeight: "1.2em",
                    },
                    "& .MuiDataGrid-cell": {
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      lineHeight: "1.4em",
                      alignItems: "start",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    },
                    "& .MuiDataGrid-row": {
                      maxHeight: "none !important",
                    },
                  }}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  disableSelectionOnClick
                  autoHeight
                />
              </Box>
            </Box>
          ))
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

// Wrap component with QueryClientProvider
function ReportsWithQueryClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reports />
    </QueryClientProvider>
  );
}

export default ReportsWithQueryClient;
