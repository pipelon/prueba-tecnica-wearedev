import taskRepository from "../repositories/task.repository.js";
import { TASK_STATUSES } from "../models/task.model.js";

class TaskService {
  getAllTasks() {
    return taskRepository.findAll();
  }

  getTaskById(id) {
    const task = taskRepository.findById(id);

    if (!task) {
      const error = new Error(`Task with id ${id} not found`);
      error.statusCode = 404;
      throw error;
    }

    return task;
  }

  createTask({ title, description, status }) {
    if (!title || title.trim().length === 0) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      throw error;
    }

    if (title.length > 100) {
      const error = new Error("Title cannot exceed 100 characters");
      error.statusCode = 400;
      throw error;
    }

    if (description && description.length > 500) {
      const error = new Error("Description cannot exceed 500 characters");
      error.statusCode = 400;
      throw error;
    }

    if (!status) {
      const error = new Error("Status is required");
      error.statusCode = 400;
      throw error;
    }

    if (!Object.values(TASK_STATUSES).includes(status)) {
      const error = new Error(
        "Status must be pending, in_progress or done"
      );
      error.statusCode = 400;
      throw error;
    }

    return taskRepository.create({
      title: title.trim(),
      description: description?.trim() || "",
      status,
    });
  }

  updateTask(id, data) {
    const task = this.getTaskById(id);

    if (data.title !== undefined) {
      if (!data.title || data.title.trim().length === 0) {
        const error = new Error("Title is required");
        error.statusCode = 400;
        throw error;
      }

      if (data.title.length > 100) {
        const error = new Error("Title cannot exceed 100 characters");
        error.statusCode = 400;
        throw error;
      }

      data.title = data.title.trim();
    }

    if (data.description !== undefined) {
      if (data.description.length > 500) {
        const error = new Error(
          "Description cannot exceed 500 characters"
        );
        error.statusCode = 400;
        throw error;
      }

      data.description = data.description.trim();
    }

    if (
      data.status !== undefined &&
      !Object.values(TASK_STATUSES).includes(data.status)
    ) {
      const error = new Error(
        "Status must be pending, in_progress or done"
      );
      error.statusCode = 400;
      throw error;
    }

    return taskRepository.update(task.id, data);
  }

  deleteTask(id) {
    this.getTaskById(id);

    taskRepository.delete(id);
  }
}

export default new TaskService();