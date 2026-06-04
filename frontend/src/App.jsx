import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Build Login Page",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      name: "Design Dashboard",
      priority: "Medium",
      status: "Completed",
    },
  ]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      name: task,
      priority,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("Medium");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === "Completed" ? "Pending" : "Completed",
            }
          : t
      )
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const pendingTasks = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  return (
    <div className="container">
      <h1>Task Management Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="card">
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div className="card">
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.priority}</td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => toggleStatus(t.id)}>
                  Toggle Status
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;