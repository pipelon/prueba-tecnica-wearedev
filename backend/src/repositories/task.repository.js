import { randomUUID } from "node:crypto";

const tasks = [];

export const taskRepository = {
  findAll() {
    return [...tasks];
  },

  findById(id) {
    return tasks.find((task) => task.id === id) ?? null;
  },

  create(data) {
    const now = new Date().toISOString();

    const task = {
      id: randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(task);

    return task;
  },

  update(id, data) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;

    return updatedTask;
  },

  delete(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return false;
    }

    tasks.splice(taskIndex, 1);

    return true;
  },
};
