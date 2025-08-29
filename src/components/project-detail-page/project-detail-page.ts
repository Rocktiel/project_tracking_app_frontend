import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../models/task.model';
import { TaskListComponent } from '../task-list/task-list';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.css',
})
export class ProjectDetailPage implements OnInit {
  project = signal<Project | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectById(id).subscribe({
      next: (data) => this.project.set(data),
      error: () => this.project.set(null),
    });
  }
}
