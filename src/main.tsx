import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./firebase-config.ts";
import App from "./App.tsx";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
