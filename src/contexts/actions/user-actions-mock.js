export function findAll(filters = {}) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  // Apply filters if any
  return Promise.resolve(
    users.filter((user) => {
      return Object.keys(filters).every((key) => user[key] === filters[key]);
    })
  );
}

export function deleteUser(item) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((user) => user.id !== item.id);
  localStorage.setItem("users", JSON.stringify(users));
  return Promise.resolve();
}

export function editUser(item, newValues) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map((user) =>
    user.id === item.id ? { ...user, ...newValues } : user
  );
  localStorage.setItem("users", JSON.stringify(users));
  return Promise.resolve(newValues);
}

export function addUser(newValues) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const newUser = { ...newValues, id: Date.now() }; // Generate a simple unique ID
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return Promise.resolve(newUser);
}
