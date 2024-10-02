import { createRoot } from "react-dom/client";
import "./index.css";
import { Init } from "./components/init";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Init />
  // </StrictMode>
);
