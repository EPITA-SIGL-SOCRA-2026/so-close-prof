import React from "react";
import "./TaskPlanner.css";

interface Task {
  id: number;
  title: string;
  date: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: 1, title: "Arroser le jardin", date: "2025-06-26", done: false },
  { id: 2, title: "Planter les tomates", date: "2025-06-26", done: false },
  { id: 3, title: "Tailler les haies", date: "2025-06-27", done: false },
];

export function TaskToDo() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

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

  return (
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
