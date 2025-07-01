import React from "react";
import "./TaskPlanner.css";

interface Task {
  id: number;
  title: string;
  date: string;
}

export function TaskPlanner() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [title, setTitle] = React.useState("");
  const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
  const [date, setDate] = React.useState(today);

  const addTask = () => {
    if (!title || !date) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      date,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDate("");
  };

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    addTask();
  }

  return (
    <div className="task-planner">
      <h1>Planification des tâches</h1>
      <form className="task-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nom de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <small>{task.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
