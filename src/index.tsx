import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { exposeCharacterToleranceAsCssVariable } from "./util/constants";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter basename="waldo">
      <App />
    </BrowserRouter>
  </StrictMode>,
);

exposeCharacterToleranceAsCssVariable();
