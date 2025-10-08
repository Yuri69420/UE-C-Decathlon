import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import DecathlonPhoneMockup from "./components/PhoneMockup.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DecathlonPhoneMockup />
  </StrictMode>
);
