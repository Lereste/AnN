import { Routes } from '@angular/router';

/*

  ============ Note:
  When deloy on Vercel, you need to change index.html to --> <base href="/admin/"> for load asset (JS, CSS)
  When running on localhost: index.html --> <base href="/"> OR localhost:2000/admin instead of localhost:2000
*/
export const ADMIN_APP_ROUTES: Routes = [
  {
    path: '',
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
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
