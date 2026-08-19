import { taskRepository } from './task.repository.js';

describe('taskRepository', () => {
  it('creates and retrieves a task', () => {
    const task = taskRepository.create({
      title: 'Learn Node.js',
      description: 'Review Express architecture',
      status: 'pending',
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Learn Node.js');
    expect(task.description).toBe('Review Express architecture');
    expect(task.status).toBe('pending');
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();

    expect(taskRepository.findById(task.id)).toEqual(task);
  });

  it('updates a task and refreshes updatedAt', async () => {
    const task = taskRepository.create({
      title: 'Original title',
      status: 'pending',
    });

    const originalUpdatedAt = task.updatedAt;

    await new Promise((resolve) => setTimeout(resolve, 5));

    const updatedTask = taskRepository.update(task.id, {
      title: 'Updated title',
      status: 'done',
    });

    expect(updatedTask.title).toBe('Updated title');
    expect(updatedTask.status).toBe('done');
    expect(updatedTask.updatedAt).not.toBe(originalUpdatedAt);
    expect(updatedTask.createdAt).toBe(task.createdAt);
  });

  it('returns null when updating a task that does not exist', () => {
    expect(
      taskRepository.update('non-existent-id', {
        title: 'Updated',
      }),
    ).toBeNull();
  });

  it('deletes an existing task', () => {
    const task = taskRepository.create({
      title: 'Task to delete',
      status: 'pending',
    });

    expect(taskRepository.delete(task.id)).toBe(true);
    expect(taskRepository.findById(task.id)).toBeNull();
  });

  it('returns false when deleting a task that does not exist', () => {
    expect(taskRepository.delete('non-existent-id')).toBe(false);
  });
});