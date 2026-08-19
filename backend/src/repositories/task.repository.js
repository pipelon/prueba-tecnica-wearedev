import { Task } from "../models/task.model.js";

const tasks = [];
let nextId = 1;

class TaskRepository {
  findAll() {
    return tasks;
  }

  findById(id) {
    return tasks.find((task) => task.id === id);
  }

  create(taskData) {
    const task = new Task({
      id: nextId++,
      ...taskData,
    });

    tasks.push(task);

    return task;
  }

  update(id, taskData) {
    const task = this.findById(id);

    if (!task) {
      return null;
    }

    Object.assign(task, taskData);
    task.updatedAt = new Date();

    return task;
  }

  delete(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return false;
    }

    tasks.splice(taskIndex, 1);

    return true;
  }

  clear() {
    tasks.length = 0;
    nextId = 1;
  }
}

export default new TaskRepository();
