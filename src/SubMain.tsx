import React from "react";
import ReactDOM from "react-dom/client";
import { SubApp } from "./SubApp";

ReactDOM.createRoot(document.getElementById("subRoot") as HTMLElement).render(
  <React.StrictMode>
    <SubApp />
  </React.StrictMode>,
);
