import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { ProjectAddComponent } from '../project-add/project-add';
import { ProjectListComponent } from '../project-list/project-list';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [CommonModule, ProjectAddComponent, ProjectListComponent, ButtonComponent],
  templateUrl: './project-list-page.html',
  styleUrl: './project-list-page.css',
})
export class ProjectListPage {
  private projectService = inject(ProjectService);
  projects = signal<Project[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Sayfa yüklendiğinde projeleri al
  ngOnInit() {
    this.fetchProjects();
  }

  // Projeleri çekiyoruz
  fetchProjects() {
    this.isLoading.set(true);
    this.error.set(null);
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Proje listesi alınamadı. Backend sunucusunun çalıştığından emin olun.');
        this.isLoading.set(false);
      },
    });
  }
}
