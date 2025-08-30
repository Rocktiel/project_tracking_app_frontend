import { Routes } from '@angular/router';
import { ProjectListPage } from '../components/project-list-page/project-list-page';
import { ProjectDetailPage } from '../components/project-detail-page/project-detail-page';

export const routes: Routes = [
  {
    path: '',
    component: ProjectListPage,
  },
  {
    path: 'project/:id',
    component: ProjectDetailPage,
  },
];
