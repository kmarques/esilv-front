import { useContext } from "react";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserProvider";
import useNotify from "../../../hooks/useNotify";
import { useNavigate } from "react-router";

export default function UserCreate() {
  const { addUser } = useContext(UserContext);
  const notify = useNotify();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    addUser(data)
      .then(() => notify("success", "User created"))
      .then(() => navigate("/admin/users"));
  }

  return (
    <>
      <h1>Create a user</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="name" />
        <input name="phone" placeholder="phone" />
        <input name="email" placeholder="email" />
        <input name="username" placeholder="username" />
        <Button type="submit">Enregistrer</Button>
      </form>
    </>
  );
}
