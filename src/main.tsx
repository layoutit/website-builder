import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/globals.css";
import "../styles/alegreyaFont.css";
import { StoreProvider } from "../store";
import { App } from "./App";
import { applyDocumentMetadata, syncQueryRobots } from "./metadata";

applyDocumentMetadata();
syncQueryRobots();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("LayoutIt root element was not found.");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
