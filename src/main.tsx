import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { worker } from "./mocks/Browser.ts";
import "sanitize.css";

switch (import.meta.env.MODE) {
  case "development":
    worker.start().then(() => {
      createReactApp();
    });
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
