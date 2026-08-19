import { Routes } from '@angular/router';

export const PLATFORMS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./platform-list/platform-list.component').then((m) => m.PlatformListComponent)
  },
  {
    // OTT and Shopping platforms get dedicated experiences (Phases 4-5); other
    // categories still fall through to the generic Platform Engine shell below
    // until their own phases land.
    path: 'ott/:platformId',
    loadChildren: () => import('../ott/ott.routes').then((m) => m.OTT_ROUTES)
  },
  {
    path: 'shopping/:platformId',
    loadChildren: () => import('../shopping/shopping.routes').then((m) => m.SHOPPING_ROUTES)
  },
  {
    path: ':category',
    loadComponent: () =>
      import('./platform-list/platform-list.component').then((m) => m.PlatformListComponent)
  },
  {
    path: ':category/:platformId',
    loadComponent: () =>
      import('./platform-detail/platform-detail.component').then((m) => m.PlatformDetailComponent)
  }
];
