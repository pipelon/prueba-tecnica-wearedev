import taskService from "../services/task.service.js";

class TaskController {
  getAllTasks(req, res, next) {
    try {
      const tasks = taskService.getAllTasks();

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  getTaskById(req, res, next) {
    try {
      const id = Number(req.params.id);

      const task = taskService.getTaskById(id);

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  createTask(req, res, next) {
    try {
      const task = taskService.createTask(req.body);

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  updateTask(req, res, next) {
    try {
      const id = Number(req.params.id);

      const task = taskService.updateTask(id, req.body);

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  deleteTask(req, res, next) {
    try {
      const id = Number(req.params.id);

      taskService.deleteTask(id);

      res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
