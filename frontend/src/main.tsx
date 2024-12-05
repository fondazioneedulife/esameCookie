import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#fff",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider defaultMode="dark" theme={theme}>
      <CssBaseline disableColorScheme />
      <App />
    </CssVarsProvider>
  </StrictMode>,
);
