import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskModal } from '../task-modal/task-modal';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TaskModal],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  tasks = signal<Task[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  showModal = signal(false);
  selectedTask = signal<Task | null>(null);

  searchTerm = signal('');

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);

        if (error.status === 404) {
          this.errorMessage.set('No se encontraron las tareas.');
        } else if (error.status >= 500) {
          this.errorMessage.set(
            'El servidor no está disponible. Intenta nuevamente.'
          );
        } else if (error.name === 'TimeoutError') {
          this.errorMessage.set(
            'La solicitud tardó demasiado. Intenta nuevamente.'
          );
        } else {
          this.errorMessage.set(
            'No fue posible cargar las tareas.'
          );
        }
      }
    });
  }

  openCreateModal(): void {
    this.selectedTask.set(null);
    this.showModal.set(true);
  }

  openEditModal(task: Task): void {
    this.selectedTask.set(task);
    this.showModal.set(true);
  }

  closeModal(): void {
    if (!this.isSaving()) {
      this.showModal.set(false);
    }
  }

  saveTask(taskData: Partial<Task>): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    const selectedTask = this.selectedTask();

    const request = selectedTask
      ? this.taskService.updateTask(selectedTask.id, taskData)
      : this.taskService.createTask(taskData);

    request.subscribe({
      next: (task) => {

        if (selectedTask) {
          this.tasks.update(tasks =>
            tasks.map(item =>
              item.id === task.id ? task : item
            )
          );

          this.successMessage.set('Tarea actualizada correctamente.');
        } else {
          this.tasks.update(tasks => [...tasks, task]);

          this.successMessage.set('Tarea creada correctamente.');
        }

        this.isSaving.set(false);
        this.showModal.set(false);

        this.clearSuccessMessage();
      },
      error: (error) => {
        this.isSaving.set(false);

        if (error.status === 400) {
          this.errorMessage.set(
            'Los datos enviados no son válidos.'
          );
        } else if (error.status === 404) {
          this.errorMessage.set(
            'La tarea no existe.'
          );
        } else if (error.status >= 500) {
          this.errorMessage.set(
            'Ocurrió un error en el servidor.'
          );
        } else {
          this.errorMessage.set(
            'No fue posible guardar la tarea.'
          );
        }
      }
    });
  }

  deleteTask(task: Task): void {

    const confirmed = confirm(
      `¿Seguro que deseas eliminar "${task.title}"?`
    );

    if (!confirmed) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {

        this.tasks.update(tasks =>
          tasks.filter(item => item.id !== task.id)
        );

        this.isLoading.set(false);

        this.successMessage.set(
          'Tarea eliminada correctamente.'
        );

        this.clearSuccessMessage();
      },
      error: (error) => {

        this.isLoading.set(false);

        if (error.status === 404) {
          this.errorMessage.set(
            'La tarea no existe o ya fue eliminada.'
          );
        } else {
          this.errorMessage.set(
            'No fue posible eliminar la tarea.'
          );
        }
      }
    });
  }

  changeStatus(task: Task): void {

    let nextStatus: Task['status'];

    if (task.status === 'pending') {
      nextStatus = 'in_progress';
    } else if (task.status === 'in_progress') {
      nextStatus = 'done';
    } else {
      nextStatus = 'pending';
    }

    this.taskService.updateTask(task.id, {
      status: nextStatus
    }).subscribe({
      next: (updatedTask) => {

        this.tasks.update(tasks =>
          tasks.map(item =>
            item.id === updatedTask.id
              ? updatedTask
              : item
          )
        );

        this.successMessage.set(
          'Estado actualizado correctamente.'
        );

        this.clearSuccessMessage();
      },
      error: () => {
        this.errorMessage.set(
          'No fue posible cambiar el estado de la tarea.'
        );
      }
    });
  }

  filteredTasks(): Task[] {

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    if (!search) {
      return this.tasks();
    }

    return this.tasks().filter(task =>
      task.title.toLowerCase().includes(search) ||
      (task.description || '').toLowerCase().includes(search)
    );
  }

  clearSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage.set('');
    }, 2500);
  }
}