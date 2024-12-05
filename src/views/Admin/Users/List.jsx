/**
 * CRUD Users
 * Ajouter la possibilité de créer un nouveau user
 * Ajouter la possibilité de modifier un user
 * Ajouter la possibilité de supprimer un user
 */

import { useContext } from "react";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserProvider";
import useNotify from "../../../hooks/useNotify";
import { Link, useNavigate } from "react-router";

export default function UserList() {
  const { getData, deleteUser, editUser, addUser } = useContext(UserContext);
  const navigate = useNavigate();
  const notify = useNotify();

  function generateAlert() {
    // random between success and danger level
    const level = Math.random() < 0.5 ? "success" : "danger";
    notify(level, "This is a random alert message " + level);
  }

  return (
    <>
      <h1>Liste des utilisateurs</h1>
      <Button onClick={generateAlert}>Spam alert</Button>
      <Button component={Link} to="/admin/users/create">
        Create user (with Link)
      </Button>
      <Button onClick={() => navigate("/admin/users/create")}>
        Create user (with navigate)
      </Button>
      <Table
        getData={getData}
        onDelete={deleteUser}
        onEdit={editUser}
        onAdd={addUser}
      />
    </>
  );
}
