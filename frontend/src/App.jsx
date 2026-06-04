import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Task Management Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <h3>Total Tasks: {tasks.length}</h3>
      <h3>Completed Tasks: {completedTasks}</h3>
      <h3>Pending Tasks: {pendingTasks}</h3>

      <hr />

      {tasks.map((t) => (
        <div
          key={t.id}
          style={{
            marginBottom: "10px",
            border: "1px solid gray",
            padding: "10px",
          }}
        >
          <span
            style={{
              textDecoration: t.completed ? "line-through" : "none",
              marginRight: "15px",
            }}
          >
            {t.text}
          </span>

          <button onClick={() => toggleTask(t.id)}>
            {t.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => deleteTask(t.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;