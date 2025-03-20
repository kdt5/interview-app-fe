import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { worker } from "./mocks/Worker.ts";
import App from "./App.tsx";
import "sanitize.css";

switch (import.meta.env.MODE) {
  case "development":
    if (import.meta.env.VITE_DEVELOPMENT_MSW_MODE) {
      worker.start().then(() => {
        createReactApp();
      });
    } else {
      createReactApp();
    }
    break;

  default:
    createReactApp();
    break;
}

function createReactApp() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
