import { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";
import { TaskListContext } from "../../contexts/TaskListContext";

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
  const { tasks, fetchTasks, deleteTask, toggleTaskStatus, addTask } =
    useContext(TaskListContext);
  useEffect(() => {
    console.log("Tasks changed");
    return () => {
      console.log("Tasks will change");
    };
  }, [tasks]);

  useEffect(() => {
    console.log("Task list mounted");
    fetchTasks();
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
