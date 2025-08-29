import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
  @Output() onDelete = new EventEmitter<Project>();

  isLoading = signal(false);
  error = signal<string | null>(null);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  trackById(index: number, project: Project) {
    return project.id;
  }

  deleteProject(id: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter((p: Project) => p.id !== id);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Proje silinemedi. Lütfen tekrar deneyin.');
        this.isLoading.set(false);
      },
    });
  }

  goToProjectDetails(id: number) {
    this.router.navigate(['/project', id]);
  }
}
