import { ButtonBase } from "../Button";

export default function TaskItem({ task, onDelete, onToggleStatus }) {
  const handleItemClick = (event) => {
    if (event.currentTarget === event.target) {
      onToggleStatus();
      event.stopPropagation();
    }
  };

  return (
    <div
      onClick={handleItemClick}
      style={{
        textDecoration: task.status ? "line-through" : "none",
      }}
    >
      ({task.id}) {task.title} - {task.date}
      <ButtonBase style={{ marginLeft: "50px" }} onClick={onDelete}>
        Delete
      </ButtonBase>
    </div>
  );
}
