const TASK_STATUSES = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

class Task {
  constructor({
    id,
    title,
    description = "",
    status = TASK_STATUSES.PENDING,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { Task, TASK_STATUSES };
