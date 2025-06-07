import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'crud',
    renderMode: RenderMode.Server
  },
  {
    path: 'crud/create',
    renderMode: RenderMode.Client,
  },
  {
    path: 'crud/read',
    renderMode: RenderMode.Client,
  },
  {
    path: 'crud/update',
    renderMode: RenderMode.Client,
  },
  {
    path: 'crud/delete',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
