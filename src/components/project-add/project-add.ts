import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './project-add.html',
  styleUrl: './project-add.css',
})
export class ProjectAddComponent {
  projectName: string = '';
  projectDescription: string = '';
  message = signal<string | null>(null);
  isAdding = signal(false);

  constructor(private projectService: ProjectService) {}

  @Output() projectAdded = new EventEmitter<Project>();

  addProject() {
    if (!this.projectName) return;

    this.isAdding.set(true);
    this.message.set(null);

    this.projectService
      .createProject({ name: this.projectName, description: this.projectDescription })
      .subscribe({
        next: (newProject) => {
          this.message.set('Proje başarıyla eklendi!');
          this.projectName = '';
          this.projectDescription = '';
          this.projectAdded.emit(newProject);
          this.isAdding.set(false);
        },
        error: (err) => {
          this.message.set('Proje eklenemedi.');
          this.isAdding.set(false);
        },
      });
  }
}
