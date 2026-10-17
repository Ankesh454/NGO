import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
         <RouterProvider router={AppRoutes} />
         <SpeedInsights />
      </HelmetProvider>
   
  </React.StrictMode>
);
