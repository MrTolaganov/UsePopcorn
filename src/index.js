import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app";
import { StarRating } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating /> */}
  </React.StrictMode>
);
