import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/create',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/read',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/update',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/delete',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
