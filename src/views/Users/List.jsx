/**
 * CRUD Users
 * Ajouter la possibilité de créer un nouveau user
 * Ajouter la possibilité de modifier un user
 * Ajouter la possibilité de supprimer un user
 */

import { useEffect, useState } from "react";
import Table from "../../components/Table";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* simule de la lenteur*/ setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) =>
          data.map((item) => ({
            id: item.id,
            name: item.name,
            phone: item.phone,
          }))
        )
        //.then((data) => {
        //  setUsers(data);
        //  setLoading(false);
        //});
        // <==>
        .then((data) => setUsers(data) || setLoading(false));
    }, 2000);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return <Table data={users} />;
}
