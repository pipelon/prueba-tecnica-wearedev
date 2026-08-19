import { jest } from "@jest/globals";

const mockTaskService = {
  getAllTasks: jest.fn(),
  getTaskById: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
};

jest.unstable_mockModule("../services/task.service.js", () => ({
  default: mockTaskService,
}));

const { default: taskController } = await import("./task.controller.js");

describe("TaskController", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {},
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  describe("getAllTasks", () => {
    it("should return all tasks with status 200", () => {
      const tasks = [
        {
          id: 1,
          title: "Task 1",
          status: "pending",
        },
      ];

      mockTaskService.getAllTasks.mockReturnValue(tasks);

      taskController.getAllTasks(req, res, next);

      expect(mockTaskService.getAllTasks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tasks);
      expect(next).not.toHaveBeenCalled();
    });

    it("should pass errors to the error middleware", () => {
      const error = new Error("Something went wrong");

      mockTaskService.getAllTasks.mockImplementation(() => {
        throw error;
      });

      taskController.getAllTasks(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getTaskById", () => {
    it("should return a task with status 200", () => {
      const task = {
        id: 1,
        title: "Task 1",
        status: "pending",
      };

      req.params.id = "1";

      mockTaskService.getTaskById.mockReturnValue(task);

      taskController.getTaskById(req, res, next);

      expect(mockTaskService.getTaskById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(task);
    });

    it("should pass errors to the error middleware", () => {
      const error = new Error("Task not found");

      req.params.id = "1";

      mockTaskService.getTaskById.mockImplementation(() => {
        throw error;
      });

      taskController.getTaskById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("createTask", () => {
    it("should create a task and return status 201", () => {
      const taskData = {
        title: "New task",
        description: "Test description",
        status: "pending",
      };

      const task = {
        id: 1,
        ...taskData,
      };

      req.body = taskData;

      mockTaskService.createTask.mockReturnValue(task);

      taskController.createTask(req, res, next);

      expect(mockTaskService.createTask).toHaveBeenCalledWith(taskData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(task);
    });

    it("should pass errors to the error middleware", () => {
      const error = new Error("Validation error");

      mockTaskService.createTask.mockImplementation(() => {
        throw error;
      });

      taskController.createTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateTask", () => {
    it("should update a task and return status 200", () => {
      const taskData = {
        title: "Updated task",
        status: "done",
      };

      const task = {
        id: 1,
        ...taskData,
      };

      req.params.id = "1";
      req.body = taskData;

      mockTaskService.updateTask.mockReturnValue(task);

      taskController.updateTask(req, res, next);

      expect(mockTaskService.updateTask).toHaveBeenCalledWith(1, taskData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(task);
    });

    it("should pass errors to the error middleware", () => {
      const error = new Error("Task not found");

      req.params.id = "1";

      mockTaskService.updateTask.mockImplementation(() => {
        throw error;
      });

      taskController.updateTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteTask", () => {
    it("should delete a task and return status 200", () => {
      req.params.id = "1";

      mockTaskService.deleteTask.mockReturnValue();

      taskController.deleteTask(req, res, next);

      expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task deleted successfully",
      });
    });

    it("should pass errors to the error middleware", () => {
      const error = new Error("Task not found");

      req.params.id = "1";

      mockTaskService.deleteTask.mockImplementation(() => {
        throw error;
      });

      taskController.deleteTask(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
