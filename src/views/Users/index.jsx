import { useState } from "react";
import UserList from "./List";
import UserCreate from "./Create";
import UserProvider from "../../contexts/UserProvider";

export default function UserIndex() {
  const [path, setPath] = useState("/");

  const routes = {
    "/": UserList,
    "/create": UserCreate,
  };

  const Component = routes[path];
  const navigate = function (path) {
    setPath(path);
  };
  return (
    <UserProvider>
      <Component navigate={navigate} />
    </UserProvider>
  );
}
