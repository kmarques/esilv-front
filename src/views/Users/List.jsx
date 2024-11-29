/**
 * CRUD Users
 * Ajouter la possibilité de créer un nouveau user
 * Ajouter la possibilité de modifier un user
 * Ajouter la possibilité de supprimer un user
 */

import { useEffect, useState } from "react";
import Table from "../../components/Table";

export default function UserList({ theme }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* simule de la lenteur*/ setTimeout(() => {
      findAll();
    }, 2000);
  }, []);

  function findAll(filters = {}) {
    setLoading(true);
    const searchParams = new URLSearchParams(filters);
    return (
      fetch("http://localhost:3000/users?" + searchParams.toString())
        .then((res) => res.json())
        //.then((data) => {
        //  setUsers(data);
        //  setLoading(false);
        //});
        // <==>
        .then((data) => setUsers(data) || setLoading(false))
    );
  }

  function deleteUser(item) {
    return fetch(`http://localhost:3000/users/${item.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== item.id));
        alert(`User #${item.id} has been deleted`);
      }
    });
  }

  function editUser(item, newValues) {
    return fetch(`http://localhost:3000/users/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify(newValues),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (data) =>
          setUsers(users.map((user) => (user.id === item.id ? data : user))) ||
          setLoading(false)
      );
  }

  function addUser(newValues) {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setLoading(false);
      });
  }

  function getData() {
    return users.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      user: item.username,
    }));
  }

  if (loading) return <h1>Loading...</h1>;
  return (
    <Table
      theme={theme}
      getData={getData}
      onDelete={deleteUser}
      onEdit={editUser}
      onAdd={addUser}
    />
  );
}
