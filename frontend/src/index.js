import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DaiktasContextProvider } from "./context/DaiktasContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ReservationProvider } from "./context/ReservationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReservationProvider>
      <AuthContextProvider>
        <DaiktasContextProvider>
          <App />
        </DaiktasContextProvider>
      </AuthContextProvider>
    </ReservationProvider>
  </React.StrictMode>
);
