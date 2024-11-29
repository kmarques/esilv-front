export function findAll(filters = {}) {
  const searchParams = new URLSearchParams(filters);
  return fetch("http://localhost:3000/users?" + searchParams.toString()).then(
    (res) => res.json()
  );
}

export function deleteUser(item) {
  return fetch(`http://localhost:3000/users/${item.id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });
}

export function editUser(item, newValues) {
  return fetch(`http://localhost:3000/users/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify(newValues),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
}

export function addUser(newValues) {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newValues),
  }).then((res) => res.json());
}
