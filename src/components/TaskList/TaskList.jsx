import { useState } from "react";
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      title: "Task 1",
      status: false,
      date: new Date().toLocaleString(),
    },
    {
      id: uuidv4(),
      title: "Task 2",
      status: false,
      date: new Date().toLocaleString(),
    },
  ]);

  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const editTask = (task, newValue) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          t = { ...t, ...newValue };
        }
        return t;
      })
    );
  };

  const toggleTaskStatus = (task) => {
    editTask(task, {
      status: !task.status,
    });
  };

  return (
    <div>
      <h2>Task list</h2>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          onDelete={() => deleteTask(task)}
          onToggleStatus={() => toggleTaskStatus(task)}
        />
      ))}
      <TaskForm onSubmit={addTask} />
    </div>
  );
}
