import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { addRealCharacterCoordsToDatabase } from "./util/firebase.js";
import { exposeCharacterToleranceAsCssVariable } from "./util/constants";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

addRealCharacterCoordsToDatabase();

exposeCharacterToleranceAsCssVariable();
