import { Routes } from '@angular/router';

export const OTT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./ott-home/ott-home.component').then((m) => m.OttHomeComponent)
  },
  {
    path: 'title/:contentId',
    loadComponent: () => import('./movie-detail/movie-detail.component').then((m) => m.MovieDetailComponent)
  }
];
