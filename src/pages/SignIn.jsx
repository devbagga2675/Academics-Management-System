import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider"; // Import Divider
import { styled } from "@mui/material/styles"; // Import theming components
import { useAuth } from "../context/AuthProvider";
import { ToastContainer } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is empty");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isValid) {
      login(email, password);
    }
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
        {" "}
        {/* Centered content */}
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "left", fontWeight: "bold", color: "#444444" }}
            fullWidth
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMessage}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              fullWidth
              required
              variant="outlined"
            />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>

          {/* === ADDED DISCLAIMER SECTION START === */}
          <Box
            sx={{
              gap: 1.5,
              mt: 2,
              borderRadius: 1,
              backgroundColor: "primary.lighter", // Or a custom color like '#f0f7ff'
              color: "primary.darker", // Or a custom color like '#053e68'
            }}
          >
            <Typography variant="h6">
              <strong>Important Note</strong>
            </Typography>
            <Typography variant="body">
              The actual system is under development.
              This is only a prototype of the actual system, intended for
              demonstration of the User Interface and Functionalities.
              <br />
              The credentials and the data inside the portal is all dummy data.
              <br />
              You will be seeing the faculty side of the portal
            </Typography>
          </Box>
          {/* === ADDED DISCLAIMER SECTION END === */}
        </Card>
      </SignInContainer>
    </div>
  );
}
