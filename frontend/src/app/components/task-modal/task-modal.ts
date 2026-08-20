import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css'
})
export class TaskModal implements OnChanges {

  @Input() visible = false;
  @Input() task: Task | null = null;
  @Input() isSaving = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Task>>();

  taskForm;

  constructor(private fb: FormBuilder) {

    this.taskForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ],

      description: [
        '',
        [
          Validators.maxLength(500)
        ]
      ],

      status: [
        'pending',
        Validators.required
      ]
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['visible'] || changes['task']) {
      this.setFormValues();
    }

  }

  setFormValues(): void {

    if (this.task) {

      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description || '',
        status: this.task.status
      });

    } else {

      this.taskForm.reset({
        title: '',
        description: '',
        status: 'pending'
      });

    }

  }

  submit(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;
    }

    this.save.emit(
      this.taskForm.getRawValue() as Partial<Task>
    );

  }

  closeModal(): void {

    if (!this.isSaving) {
      this.close.emit();
    }

  }

}