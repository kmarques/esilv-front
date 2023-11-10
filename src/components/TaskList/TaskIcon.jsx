import { useContext } from "react";
import { TaskListContext } from "../../contexts/TaskListContext";

export default function TaskIcon() {
  const { tasks } = useContext(TaskListContext);

  return (
    <span
      style={{
        border: "1px solid black",
        borderRadius: "50%",
        padding: "5px",
        backgroundColor: "red",
        color: "white",
      }}
    >
      {tasks.length}
    </span>
  );
}
