import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import R3nvioPortfolio from "./App.jsx";

document.documentElement.classList.add("app-ready");

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <R3nvioPortfolio />
  </React.StrictMode>
);
