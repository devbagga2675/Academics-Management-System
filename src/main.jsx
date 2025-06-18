import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
);

// After the app has rendered, remove the initial loader
window.onload = () => {
  const initialLoader = document.getElementById('initial-loader-container');
  if (initialLoader) {
    initialLoader.style.display = 'none'; // Or you can use initialLoader.remove();
  }
};