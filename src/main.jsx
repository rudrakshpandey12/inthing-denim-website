import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoryPage from "./StoryPage";
import SustainabilityPage from "./SustainabilityPage";
import "./styles.css";

const path = window.location.pathname;

let Page = App;

if (path === "/story") {
  Page = StoryPage;
} else if (path === "/sustainability") {
  Page = SustainabilityPage;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);