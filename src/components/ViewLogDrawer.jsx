import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import ProjectTag from "./ProjectTag";
import {
  Drawer,
  Box,
  Typography,
  Stack,
  TextField,
  Link,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CrossButton from "./CrossButton";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useParams } from "react-router-dom";
import api from "./api";
import { useAuth } from "../context/AuthProvider";

const ViewLogDrawer = ({ open, onClose, logData }) => {
  const { userMeta } = useAuth();
  const userDesignation = userMeta?.userDesignation || "";
  const { id } = useParams();

  const dummyData = logData || {
    date: "15/09/2023",
    outcomeOfPreviousMeeting: "Discussed project milestones.",
    discussionActivityPoints: "Brainstormed new features and assigned tasks.",
    expectedOutcome: "Finalized project timeline.",
    planForNextMeeting: "Review progress and address roadblocks.",
    pendingActivity: "Complete research on competitor products.",
    guideComment: "Good progress, keep up the momentum.",
    submitted: { status: true, date: "15/09/2023", by: "Test User" },
    approved: { status: true, date: "15/09/2023", by: "Guide" },
    firstSign: { status: true, date: "15/09/2023", by: "Program Chair" }, // Program Chair
    secondSign: { status: false, date: null, by: null }, // Dean
    file: null,
  };

  const [logDetails, setLogDetails] = useState(dummyData);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchLogDetails = useMutation({
    mutationFn: async (id) => {
      const response = await api.post(`/logs/`, {
        id,
        date: logDetails.date,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setLogDetails(data.Data || dummyData);
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Error fetching log details.",
        severity: "error",
      });
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (apiUrl) => {
      const response = await api.post(apiUrl, {
        logId: id,
        userDesignation,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setLogDetails(data.Data || logDetails);
      setSnackbar({
        open: true,
        message: "Approval successful!",
        severity: "success",
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: "Approval failed.",
        severity: "error",
      });
    },
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (open) {
      fetchLogDetails.mutate(id);
    }
  }, [id, open]);

  const approvalApis = {
    guide: "/approve/guide",
    program_chair: "/approve/program_chair",
    dean: "/approve/dean",
  };

  const canApprove = () => {
    if (!userDesignation) return false;
    if (userDesignation === "guide") {
      return logDetails.submitted?.status && !logDetails.approved?.status;
    }
    if (userDesignation === "program_chair") {
      return logDetails.approved?.status && !logDetails.firstSign?.status;
    }
    if (userDesignation === "dean") {
      return logDetails.firstSign?.status && !logDetails.secondSign?.status;
    }
    return false;
  };

  const handleApprove = () => {
    const apiUrl = approvalApis[userDesignation];
    if (apiUrl) {
      approveMutation.mutate(apiUrl);
    }
  };

  const timelineItems = [
    {
      label: "Submitted",
      details: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>On:</p>
            <ProjectTag label={logDetails.submitted?.date || "N/A"} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>By:</p>
            <ProjectTag label={logDetails.submitted?.by || "N/A"} />
          </div>
        </>
      ),
      completed: logDetails.submitted?.status,
    },
    {
      label: "Guide Approval",
      details: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>On:</p>
            <ProjectTag label={logDetails.approved?.date || "N/A"} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>By:</p>
            <ProjectTag label={logDetails.approved?.by || "N/A"} />
          </div>
        </>
      ),
      completed: logDetails.approved?.status,
    },
    {
      label: "Program Chair Sign",
      details: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>On:</p>
            <ProjectTag label={logDetails.firstSign?.date || "N/A"} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>By:</p>
            <ProjectTag label={logDetails.firstSign?.by || "N/A"} />
          </div>
        </>
      ),
      completed: logDetails.firstSign?.status,
    },
    {
      label: "Dean Sign",
      details: (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>On:</p>
            <ProjectTag label={logDetails.secondSign?.date || "N/A"} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p>By:</p>
            <ProjectTag label={logDetails.secondSign?.by || "N/A"} />
          </div>
        </>
      ),
      completed: logDetails.secondSign?.status,
    },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between" px={5} pt={5}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Log Details
        </Typography>
        <CrossButton onClick={onClose} />
      </Stack>

      <Stack direction={{ sm: "column", md: "row" }}>
        <Box p={5}>
          {fetchLogDetails.isError && (
            <Typography color="error">Error fetching details</Typography>
          )}
          <TextField
            label="Date"
            fullWidth
            margin="normal"
            value={logDetails.date || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Outcome of Previous Meeting"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={logDetails.outcomeOfPreviousMeeting || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Discussion/Activity Points"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={logDetails.discussionActivityPoints || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Expected Outcome"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={logDetails.expectedOutcome || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Plan for the Next Meeting"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={logDetails.planForNextMeeting || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Pending Activity"
            fullWidth
            margin="normal"
            value={logDetails.pendingActivity || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Guide Comment"
            fullWidth
            margin="normal"
            value={logDetails.guideComment || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Attached File"
            fullWidth
            margin="normal"
            value={logDetails.file?.name || "No file attached"}
            InputProps={{
              readOnly: true,
              startAdornment: logDetails.file?.url ? (
                <Link
                  href={logDetails.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: "underline", color: "inherit" }}
                >
                  View
                </Link>
              ) : null,
            }}
          />
        </Box>

        <Box p={5}>
          <Typography variant="subtitle1" marginTop={3}>
            Signatures:
          </Typography>
          <Timeline position="right">
            {timelineItems.map(
              (item, index) =>
                item.completed && (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < timelineItems.length - 1 &&
                        timelineItems[index + 1].completed && (
                          <TimelineConnector />
                        )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2">{item.label}</Typography>
                      {item.details}
                    </TimelineContent>
                  </TimelineItem>
                )
            )}
          </Timeline>

          {userDesignation && canApprove() && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApprove}
              disabled={approveMutation.isLoading}
              startIcon={
                approveMutation.isLoading ? (
                  <CircularProgress size={20} />
                ) : null
              }
              sx={{ mt: 2 }}
              fullWidth
            >
              Approve as {userDesignation.replace("_", " ").toUpperCase()}
            </Button>
          )}

          {userDesignation && !canApprove() && (
            <Typography sx={{ mt: 2 }} color="text.secondary">
              You cannot approve at this stage.
            </Typography>
          )}

          {!userDesignation && (
            <Typography color="error" sx={{ mt: 2 }}>
              No user designation found. Please check authentication.
            </Typography>
          )}
        </Box>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default ViewLogDrawer;
