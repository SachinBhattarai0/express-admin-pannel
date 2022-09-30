import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ActiveTableContext from "./context/ActiveTableContext";
import AlertProvider from "./context/AlertProvider";
import AdminPannelOptionsContext from "./context/AdminPannelOptionsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminPannelOptionsContext>
        <ActiveTableContext>
          <AlertProvider>
            <App />
          </AlertProvider>
        </ActiveTableContext>
      </AdminPannelOptionsContext>
    </BrowserRouter>
  </React.StrictMode>
);
