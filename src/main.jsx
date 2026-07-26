import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextEvaluationProvider } from "./context/ContextEvaluationForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextEvaluationProvider>
      <App />
    </ContextEvaluationProvider>
  </StrictMode>,
);
