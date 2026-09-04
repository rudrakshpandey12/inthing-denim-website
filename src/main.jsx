import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoryPage from "./StoryPage";
import "./styles.css";

const isStoryPage = window.location.pathname === "/story";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isStoryPage ? <StoryPage /> : <App />}
  </React.StrictMode>
);