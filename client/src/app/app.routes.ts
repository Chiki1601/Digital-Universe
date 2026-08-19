import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'platforms',
        loadChildren: () => import('./features/platforms/platforms.routes').then((m) => m.PLATFORMS_ROUTES)
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/admin-home/admin-home.component').then((m) => m.AdminHomeComponent)
      },
      {
        path: 'auth/login',
        loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent)
      },
      {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent)
      }
    ]
  }
];
