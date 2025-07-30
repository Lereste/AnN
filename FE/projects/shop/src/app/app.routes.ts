import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/pages.component').then((m) => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'tat-ca-san-pham',
        loadComponent: () => import('./features/all-products/all-products.component').then((route) => route.AllProductsComponent),
      },
      {
        path: 'tat-ca-bai-viet',
        loadComponent: () => import('./features/all-articles/all-articles.component').then((route) => route.AllArticlesComponent),
      },
      {
        path: 'lien-he',
        loadComponent: () => import('./features/contact/contact.component').then((route) => route.ContactComponent),
      },
      {
        path: 'gio-hang',
        loadComponent: () => import('./features/cart/cart.component').then((route) => route.CartComponent),
      },
      {
        path: 'thanh-toan-gio-hang',
        loadComponent: () => import('./features/check-out/check-out.component').then((route) => route.CheckOutComponent),
      },
      {
        path: 'chi-tiet-san-pham/:productSlug',
        loadComponent: () => import('./features/product-detail/product-detail.component').then((route) => route.ProductDetailComponent),
      },
      {
        path: 'tai-khoan',
        loadComponent: () => import('./features/authentication/account/account.component').then((route) => route.AccountComponent),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'https://admin-dienlanhhoaian.vercel.app/remoteEntry.json',
        remoteName: 'admin',
        exposedModule: './routes',
        fallback: () => import('./features/authentication/page404/page404.component').then((m) => m.Page404Component),
      }).then((m) => m.ADMIN_APP_ROUTES),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     typeof window === 'undefined'
  //       ? import('./features/authentication/authentication.module').then((m) => m.AuthenticationModule)
  //       : loadRemoteModule({
  //         remoteName: 'admin',
  //         exposedModule: './routes',
  //         fallback: () => import('./features/authentication/page404/page404.component').then(m => m.Page404Component)
  //       }).then((m) => m.ADMIN_APP_ROUTES),
  // },
  // {
  //   path: 'remote',
  //   loadComponent: () => loadRemoteModule('admin', './Component').then((m) => m.AppComponent),
  // },
  {
    path: '**',
    loadComponent: () => import('./features/authentication/page404/page404.component').then((route) => route.Page404Component),
  },
];
