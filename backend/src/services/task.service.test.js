import taskService from "./task.service.js";
import taskRepository from "../repositories/task.repository.js";

describe("TaskService", () => {
  beforeEach(() => {
    taskRepository.clear();
  });

  describe("getAllTasks", () => {
    it("should return all tasks", () => {
      taskService.createTask({
        title: "First task",
        status: "pending",
      });

      taskService.createTask({
        title: "Second task",
        status: "done",
      });

      const tasks = taskService.getAllTasks();

      expect(tasks).toHaveLength(2);
      expect(tasks[0].title).toBe("First task");
      expect(tasks[1].title).toBe("Second task");
    });

    it("should return an empty array when there are no tasks", () => {
      const tasks = taskService.getAllTasks();

      expect(tasks).toEqual([]);
    });
  });

  describe("getTaskById", () => {
    it("should return a task by id", () => {
      const createdTask = taskService.createTask({
        title: "Test task",
        status: "pending",
      });

      const task = taskService.getTaskById(createdTask.id);

      expect(task).toEqual(createdTask);
    });

    it("should throw a 404 error when the task does not exist", () => {
      expect(() => taskService.getTaskById(999)).toThrow(
        "Task with id 999 not found"
      );

      try {
        taskService.getTaskById(999);
      } catch (error) {
        expect(error.statusCode).toBe(404);
      }
    });
  });

  describe("createTask", () => {
    it("should create a task with valid data", () => {
      const task = taskService.createTask({
        title: "Learn Jest",
        description: "Write tests for the API",
        status: "pending",
      });

      expect(task.id).toBe(1);
      expect(task.title).toBe("Learn Jest");
      expect(task.description).toBe("Write tests for the API");
      expect(task.status).toBe("pending");
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    it("should throw an error when title is missing", () => {
      expect(() =>
        taskService.createTask({
          status: "pending",
        })
      ).toThrow("Title is required");
    });

    it("should throw an error when title is empty", () => {
      expect(() =>
        taskService.createTask({
          title: "   ",
          status: "pending",
        })
      ).toThrow("Title is required");
    });

    it("should throw an error when title exceeds 100 characters", () => {
      const title = "a".repeat(101);

      expect(() =>
        taskService.createTask({
          title,
          status: "pending",
        })
      ).toThrow("Title cannot exceed 100 characters");
    });

    it("should throw an error when description exceeds 500 characters", () => {
      const description = "a".repeat(501);

      expect(() =>
        taskService.createTask({
          title: "Test task",
          description,
          status: "pending",
        })
      ).toThrow("Description cannot exceed 500 characters");
    });

    it("should throw an error when status is missing", () => {
      expect(() =>
        taskService.createTask({
          title: "Test task",
        })
      ).toThrow("Status is required");
    });

    it("should throw an error when status is invalid", () => {
      expect(() =>
        taskService.createTask({
          title: "Test task",
          status: "completed",
        })
      ).toThrow("Status must be pending, in_progress or done");
    });

    it("should trim title and description", () => {
      const task = taskService.createTask({
        title: "  Test task  ",
        description: "  Description  ",
        status: "pending",
      });

      expect(task.title).toBe("Test task");
      expect(task.description).toBe("Description");
    });
  });

  describe("updateTask", () => {
    it("should update an existing task", () => {
      const task = taskService.createTask({
        title: "Old title",
        description: "Old description",
        status: "pending",
      });

      const updatedTask = taskService.updateTask(task.id, {
        title: "New title",
        description: "New description",
        status: "in_progress",
      });

      expect(updatedTask.title).toBe("New title");
      expect(updatedTask.description).toBe("New description");
      expect(updatedTask.status).toBe("in_progress");
    });

    it("should throw a 404 error when updating a task that does not exist", () => {
      expect(() =>
        taskService.updateTask(999, {
          title: "Updated",
          status: "done",
        })
      ).toThrow("Task with id 999 not found");
    });

    it("should reject an invalid status when updating", () => {
      const task = taskService.createTask({
        title: "Test task",
        status: "pending",
      });

      expect(() =>
        taskService.updateTask(task.id, {
          status: "completed",
        })
      ).toThrow("Status must be pending, in_progress or done");
    });

    it("should reject a title longer than 100 characters when updating", () => {
      const task = taskService.createTask({
        title: "Test task",
        status: "pending",
      });

      expect(() =>
        taskService.updateTask(task.id, {
          title: "a".repeat(101),
        })
      ).toThrow("Title cannot exceed 100 characters");
    });
  });

  describe("deleteTask", () => {
    it("should delete an existing task", () => {
      const task = taskService.createTask({
        title: "Task to delete",
        status: "pending",
      });

      taskService.deleteTask(task.id);

      expect(taskService.getAllTasks()).toEqual([]);
    });

    it("should throw a 404 error when deleting a task that does not exist", () => {
      expect(() => taskService.deleteTask(999)).toThrow(
        "Task with id 999 not found"
      );
    });
  });
});