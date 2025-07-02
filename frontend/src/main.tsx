import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SelectUser } from "./SelectUser.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectUser />
  </StrictMode>
);
