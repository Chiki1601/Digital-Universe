import { Routes } from '@angular/router';

export const SHOPPING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./shopping-home/shopping-home.component').then((m) => m.ShoppingHomeComponent)
  },
  {
    path: 'product/:productId',
    loadComponent: () => import('./product-detail/product-detail.component').then((m) => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then((m) => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.component').then((m) => m.CheckoutComponent)
  }
];
