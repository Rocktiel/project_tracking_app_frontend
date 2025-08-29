import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent implements OnInit {
  @Input() projectId!: number;
  tasks = signal<Task[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  private taskService = inject(TaskService);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    if (!this.projectId) return;

    this.isLoading.set(true);
    this.taskService.getTasksByProjectId(this.projectId).subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.error.set('Görevler yüklenemedi.');
        this.isLoading.set(false);
      },
    });
  }

  toggleCompletion(task: Task) {
    const newStatus = !task.isCompleted;
    this.taskService.updateIsCompleted(task.id).subscribe({
      next: (updatedTask) => {
        this.tasks.set(this.tasks().map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      },
      error: (err) => console.error('Failed to update task', err),
    });
  }
}
