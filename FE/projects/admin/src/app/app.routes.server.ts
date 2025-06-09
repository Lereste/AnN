import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'create',
    renderMode: RenderMode.Client,
  },
  {
    path: 'read',
    renderMode: RenderMode.Client,
  },
  {
    path: 'update',
    renderMode: RenderMode.Client,
  },
  {
    path: 'delete',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
