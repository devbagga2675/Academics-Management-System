import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import BackButton from "../components/BackButton";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  maxHeight: "100vh", // Full viewport height
  minHeight: "100%",
  padding: theme.spacing(),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function ResetPassword() {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] =
    React.useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const { resetPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (!newPassword) {
      setNewPasswordError(true);
      setNewPasswordErrorMessage("Please enter a new password.");
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Please confirm your new password.");
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    if (isValid) {
    //   const token = "YOUR_RESET_TOKEN_HERE"; // Replace with your actual token retrieval logic
    //   if (!token) {
    //     setSnackbarMessage("Invalid reset link.");
    //     setSnackbarSeverity("error");
    //     setSnackbarOpen(true);
    //     return;
    //   }
      try {
        setSnackbarMessage("Password reset successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        console.log("Password reset successful!");
      } catch (error) {
        console.error("Error resetting password:", error);
        setSnackbarMessage(
          "Failed to reset password. Please ensure the link is valid and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignInContainer
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card variant="outlined">
          <Stack direction={'row'} gap={2} alignItems={'center'}>
            <BackButton />
            <Typography
              variant="h5"
              sx={{
                textAlign: "left",
                fontWeight: "bold",
                color: "#444444",
              }}
              fullWidth
            >
              Reset Password
            </Typography>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={newPasswordError}
              helperText={newPasswordErrorMessage}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              helperText={confirmPasswordErrorMessage}
              fullWidth
              required
              variant="outlined"
            />
            <Button type="submit" fullWidth variant="contained">
              Set New Password
            </Button>
          </Box>
        </Card>
      </SignInContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
