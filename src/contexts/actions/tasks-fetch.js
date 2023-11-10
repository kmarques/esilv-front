export default {
  fetch: async function () {
    return fetch("http://localhost:3000/tasks").then((res) => res.json());
  },
  delete: async function (task) {
    return fetch("http://localhost:3000/tasks/" + task.id, {
      method: "DELETE",
    }).then((res) => res.ok);
  },
  add: async function (task) {
    return fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((res) => res.json());
  },
  edit: async function (oldTask, newTask) {
    return fetch("http://localhost:3000/tasks/" + oldTask.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then((res) => res.json());
  },
};
