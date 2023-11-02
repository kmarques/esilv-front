import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";

const defaultTasks = [
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
];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    console.log("Tasks changed");
    return () => {
      console.log("Tasks will change");
    };
  }, [tasks]);

  useEffect(() => {
    console.log("Task list mounted");
    setTimeout(() => setTasks(defaultTasks), [3000]);
    return () => {
      console.log("Task list will unmount");
    };
  }, []);

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
