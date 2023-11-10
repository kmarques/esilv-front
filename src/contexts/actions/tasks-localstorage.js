export default {
  fetch: async function () {
    const _data = localStorage.getItem("tasks");
    this.data = _data ? JSON.parse(_data) : [];
    return this.data;
  },
  delete: async function (task) {
    this.data = this.data.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(this.data));
    return true;
  },
  add: async function (task) {
    this.data.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.data));
    return task;
  },
  edit: async function (oldTask, newTask) {
    const value = null;
    this.data = this.data.map((t) => {
      if (t.id === oldTask.id) {
        value = { ...t, ...newTask };
        return value;
      } else {
        return t;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(this.data));
    return value;
  },
};
