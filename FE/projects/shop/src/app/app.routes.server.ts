import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tat-ca-san-pham',
    renderMode: RenderMode.Client,
  },
  {
    path: 'tat-ca-bai-viet',
    renderMode: RenderMode.Client,
  },
  {
    path: 'lien-he',
    renderMode: RenderMode.Client,
  },
  {
    path: 'gio-hang',
    renderMode: RenderMode.Server,
  },
  {
    path: 'thanh-toan-gio-hang',
    renderMode: RenderMode.Client,
  },
  {
    path: 'tai-khoan',
    renderMode: RenderMode.Client,
  },
  {
    path: 'chi-tiet-san-pham/:productSlug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
