import { createContext, useState } from "react";
import tasksActions from "./actions/tasks-fetch";
export const TaskListContext = createContext(null);

const TaskListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    return tasksActions.fetch().then((data) => setTasks(data));
  };

  const deleteTask = (task) => {
    return tasksActions
      .delete(task)
      .then(() => setTasks(tasks.filter((t) => t.id !== task.id)));
  };

  const addTask = (task) => {
    return tasksActions.add(task).then((data) => setTasks([data, ...tasks]));
  };

  const editTask = (task, newValue) => {
    return tasksActions.edit(task, newValue).then((data) =>
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
    return editTask(task, {
      status: !task.status,
    });
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        editTask,
        addTask,
        deleteTask,
        toggleTaskStatus,
        fetchTasks,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
