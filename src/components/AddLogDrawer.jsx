import {
  Drawer,
  TextField,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import dayjs from "dayjs";
import React, { useState, useRef } from "react";
import api from "./api";
import CrossButton from "./CrossButton";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AddLogDrawer = ({ open, onClose, setlogs }) => {
  const today = dayjs();
  const param = useParams();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    date: today,
    outcomeOfPreviousMeeting: "",
    discussionActivityPoints: "",
    expectedOutcome: "",
    planForNextMeeting: "",
    pendingActivity: "",
    guideComment: "",
    file: null,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      setFormData({
        ...formData,
        file: file,
      });
    }
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addNewLog = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();
      formDataToSend.append("id", param.id);
      formDataToSend.append("date", formData.date.format("DD/MM/YYYY"));
      formDataToSend.append("outcomeOfPreviousMeeting", formData.outcomeOfPreviousMeeting);
      formDataToSend.append("discussionActivityPoints", formData.discussionActivityPoints);
      formDataToSend.append("expectedOutcome", formData.expectedOutcome);
      formDataToSend.append("planForNextMeeting", formData.planForNextMeeting);
      formDataToSend.append("pendingActivity", formData.pendingActivity);
      formDataToSend.append("guideComment", formData.guideComment);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await api.post("/your-api-endpoint", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Log entry created:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setlogs((logs) => [...logs, data.Data]);
      setFormData({
        date: today,
        outcomeOfPreviousMeeting: "",
        discussionActivityPoints: "",
        expectedOutcome: "",
        planForNextMeeting: "",
        pendingActivity: "",
        guideComment: "",
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    },
    onError: (error) => {
      console.error("Error uploading log:", error);
      alert("Failed to save log entry. Please try again.");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    addNewLog.mutate();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={'100%'} p={5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Add New Log Entry
          </Typography>
          <CrossButton onClick={onClose} />
        </Stack>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                format="DD-MM-YYYY"
                value={formData.date}
                onChange={handleDateChange}
                maxDate={today}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    variant: "outlined",
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>

            <TextField
              label="Outcome of Previous Meeting"
              fullWidth
              required
              margin="normal"
              multiline
              rows={2}
              name="outcomeOfPreviousMeeting"
              value={formData.outcomeOfPreviousMeeting}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Discussion/Activity Points"
              fullWidth
              required
              margin="normal"
              multiline
              rows={3}
              name="discussionActivityPoints"
              value={formData.discussionActivityPoints}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Expected Outcome"
              fullWidth
              required
              margin="normal"
              multiline
              rows={2}
              name="expectedOutcome"
              value={formData.expectedOutcome}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Plan for the Next Meeting"
              fullWidth
              required
              margin="normal"
              multiline
              rows={2}
              name="planForNextMeeting"
              value={formData.planForNextMeeting}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />

            <Divider sx={{ my: 2 }} />

            <Box mt={2}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
                sx={{ textTransform: "none", mb: 1 }}
              >
                {formData.file ? "Replace File" : "Upload File"}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
              </Button>
              {formData.file && (
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <Typography variant="body2" color="text.secondary">
                    {formData.file.name}
                  </Typography>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={handleRemoveFile}
                    aria-label="Remove file"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}
              <Typography variant="caption" color="text.secondary">
                Max file size: 5MB. Accepted formats: PDF, DOC, DOCX, JPG, PNG
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
                color="error"
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                disabled={addNewLog.isPending}
                variant="contained"
                color="success"
                type="submit"
                sx={{ textTransform: "none" }}
              >
                {addNewLog.isPending ? "Saving..." : "Save Log"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default AddLogDrawer;