import React from "react";
import { Layout } from "./Layout";
import { TaskPlanner } from "./TaskPlanner";
import { TaskToDo } from "./TasksToDo";

type NavigationView = "planifier" | "todo";

function App() {
  // parser URL '#' suffix for routing

  const [selectedView, setSelectedView] =
    React.useState<NavigationView>("todo");

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "planifier") {
        setSelectedView("planifier");
      } else {
        setSelectedView("todo");
      }
    };
    // Initial check
    handleHashChange();
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <Layout>
      {selectedView === "planifier" ? <TaskPlanner /> : <TaskToDo />}
    </Layout>
  );
}

export default App;
