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
    fetch("http://localhost:3000/tasks/" + task.id, {
      method: "DELETE",
    }).then((res) => res.ok && setTasks(tasks.filter((t) => t.id !== task.id)));
  };

  const addTask = (task) => {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => setTasks([data, ...tasks]));
  };

  const editTask = (task, newValue) => {
    fetch("http://localhost:3000/tasks/" + task.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValue),
    })
      .then((res) => res.json())
      .then((data) =>
        setTasks(
          tasks.map((t) => {
            if (t.id === data.id) {
              t = data;
            }
            return t;
          })
        )
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
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
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
