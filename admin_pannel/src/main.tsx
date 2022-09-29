import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ActiveTableContext from "./context/ActiveTableContext";
import AlertProvider from "./context/AlertProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActiveTableContext>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ActiveTableContext>
    </BrowserRouter>
  </React.StrictMode>
);
