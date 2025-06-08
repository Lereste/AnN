import { Routes } from '@angular/router';

export const ADMIN_APP_ROUTES: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: 'create',
        loadComponent: () => import('./admin/create/create.component').then(m => m.CreateComponent)
      },
      {
        path: 'read',
        loadComponent: () => import('./admin/read/read.component').then(m => m.ReadComponent)
      },
      {
        path: 'update',
        loadComponent: () => import('./admin/update/update.component').then(m => m.UpdateComponent)
      },
      {
        path: 'delete',
        loadComponent: () => import('./admin/delete/delete.component').then(m => m.DeleteComponent)
      },
      {
        path: '',
        redirectTo: 'read',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];
