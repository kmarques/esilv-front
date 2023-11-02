import { v4 as uuidv4 } from "uuid";
import { ButtonBase } from "../Button";

export default function TaskForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      id: uuidv4(),
      title: formData.get("title"),
      status: formData.get("status") === "1",
      date: new Date().toLocaleString(),
    });

    event.currentTarget.reset();
  };

  return (
    <form
      style={{
        display: "flex",
        "flex-direction": "column",
        alignItems: "center",
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">Title</label>
      <input id="title" required name="title" />
      <div style={{ display: "flex" }}>
        <label htmlFor="status-completed">Completed</label>
        <input type="radio" name="status" id="status-completed" value="1" />
        <label htmlFor="status-not-completed">Not Completed</label>
        <input type="radio" name="status" id="status-not-completed" value="0" />
      </div>
      <ButtonBase type="submit">Create</ButtonBase>
    </form>
  );
}
