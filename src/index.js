import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import getFirebaseFunctions from "./util/firebase.js";
import { exposeCharacterToleranceAsCssVariable } from "./util/constants.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const { addCharacterCoordsToDatabase } = getFirebaseFunctions();
addCharacterCoordsToDatabase();

exposeCharacterToleranceAsCssVariable()
