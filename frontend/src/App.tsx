import React from "react";
import { Layout } from "./Layout";
import { TaskPlanner } from "./TaskPlanner";
import { TaskToDo } from "./TasksToDo";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { growthbook } from "./FeatureToggle";
import type { User } from "./SelectUser";

type NavigationView = "planifier" | "todo";

function App({ user }: { user: User }) {
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

  React.useEffect(() => {
    growthbook.init({ streaming: true });
    growthbook.setAttributes({
      userId: user.id,
      userName: user.name,
      userAge: user.age,
    });
  }, [user]);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Layout>
        {selectedView === "planifier" ? <TaskPlanner /> : <TaskToDo />}
      </Layout>
    </GrowthBookProvider>
  );
}

export default App;
