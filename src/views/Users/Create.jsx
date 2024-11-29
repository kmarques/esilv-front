import { useContext } from "react";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserProvider";
import useNotify from "../../hooks/useNotify";

export default function UserCreate({ navigate }) {
  const { addUser } = useContext(UserContext);
  const notify = useNotify();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    addUser(data)
      .then(() => notify("success", "User created"))
      .then(() => navigate("/"));
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
