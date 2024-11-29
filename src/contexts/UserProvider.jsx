import { createContext, useEffect, useState } from "react";
import * as UserActions from "./actions/user-actions-mock";
import useNotify from "../hooks/useNotify";
export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const notify = useNotify();

  useEffect(() => {
    /* simule de la lenteur*/ setTimeout(() => {
      findAll();
    }, 2000);
  }, []);

  function findAll(filters = {}) {
    setLoading(true);
    return UserActions.findAll(filters).then(
      (data) => setUsers(data) || setLoading(false)
    );
  }

  function deleteUser(item) {
    return UserActions.deleteUser(item).then(() => {
      setUsers(users.filter((user) => user.id !== item.id));
      notify("success", `User #${item.id} has been deleted`);
    });
  }

  function editUser(item, newValues) {
    return UserActions.editUser(item, newValues).then(
      (data) =>
        setUsers(users.map((user) => (user.id === item.id ? data : user))) ||
        setLoading(false) ||
        notify("success", `User #${item.id} has been updated`)
    );
  }

  function addUser(newValues) {
    return UserActions.addUser(newValues).then((newUser) => {
      setUsers([...users, newUser]);
      setLoading(false);
      notify("success", `User #${newUser.id} has been created`);
    });
  }

  function getData() {
    return users.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      username: item.username,
    }));
  }

  if (loading) return <h1>Loading...</h1>;

  return (
    <UserContext.Provider
      value={{ getData, addUser, editUser, deleteUser, findAll }}
    >
      {children}
    </UserContext.Provider>
  );
}
