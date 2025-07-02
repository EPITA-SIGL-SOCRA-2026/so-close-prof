import React from "react";
import "./TaskPlanner.css";
import { getApiDomain } from "./api";

interface Task {
  id: number;
  title: string;
  date: string;
  done: boolean;
}

export function TaskToDo() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchTasks() {
      try {
        const domain = await getApiDomain();
        const response = await fetch(`${domain}/v1/tasks`);
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const groupedTasks = tasks.reduce((acc: Record<string, Task[]>, task) => {
    if (!acc[task.date]) acc[task.date] = [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return loading ? (
    <span>Chargement des tâches...</span>
  ) : (
    <div className="task-planner">
      <h1>Tâches planifiées</h1>
      {Object.entries(groupedTasks).map(([date, dayTasks]) => (
        <div key={date} className="task-day">
          <h2>{date}</h2>
          <ul className="task-list">
            {dayTasks.map((task) => (
              <li key={task.id} className={task.done ? "done" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                  />
                  {task.title}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
