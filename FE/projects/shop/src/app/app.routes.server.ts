import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: '',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'tat-ca-san-pham',
  //   renderMode: RenderMode.Client,
  // },
  // {
  //   path: 'tat-ca-bai-viet',
  //   renderMode: RenderMode.Client,
  // },
  // {
  //   path: 'admin',
  //   renderMode: RenderMode.Client,
  // },
  // {
  //   path: 'home/create',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'home/edit/:id',
  //   renderMode: RenderMode.Server,
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
