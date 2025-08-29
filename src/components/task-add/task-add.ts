import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './task-add.html',
  styleUrl: './task-add.css',
})
export class TaskAddComponent {
  taskTitle: string = '';
  message = signal<string | null>(null);
  @Input() projectId!: number;
  @Output() taskAdded = new EventEmitter<Task>();

  isAdding = signal(false);

  constructor(private taskService: TaskService) {}

  createTask() {
    if (!this.taskTitle || !this.projectId) return;
    this.isAdding.set(true);
    this.message.set(null);
    this.taskService
      .createTask({
        title: this.taskTitle,
        projectId: this.projectId,
        isCompleted: false,
      })
      .subscribe({
        next: (newTask) => {
          this.message.set('Görev basarıyla eklendi!');
          this.taskTitle = '';
          this.taskAdded.emit(newTask);
          this.isAdding.set(false);
        },
        error: () => {
          this.message.set('Görev ekleneemedi. Lütfen tekrar deneyin.');
          this.isAdding.set(false);
        },
      });
  }
}
