import { Injectable, signal } from '@angular/core';
import { ProductSummary } from '../models/product.model';

export interface CartLine {
  product: ProductSummary;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  estimatedTax: number;
  total: number;
}

const TAX_RATE = 0.08;

/** Pure helper so Cart and Checkout compute the same numbers from the same lines. */
export function calculateCartTotals(lines: CartLine[]): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const estimatedTax = subtotal * TAX_RATE;
  return { subtotal, estimatedTax, total: subtotal + estimatedTax };
}

/**
 * In-memory cart state, scoped per platform (a cart for ShopSphere shouldn't
 * mix with FashionHub's). No backend persistence or real checkout - resets on
 * page reload, which is expected for a no-database demo.
 *
 * Lines are keyed by "{platformId}:{productId}" and exposed as one flat signal;
 * consumers derive their own `computed()` filtered to the platform they care
 * about via `linesForPlatform`, rather than getting a fresh computed per call.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly lines = signal<ReadonlyMap<string, CartLine>>(new Map());
  readonly allLines = this.lines.asReadonly();

  linesForPlatform(platformId: string): CartLine[] {
    const prefix = `${platformId}:`;
    return [...this.lines().entries()]
      .filter(([key]) => key.startsWith(prefix))
      .map(([, line]) => line);
  }

  addItem(platformId: string, product: ProductSummary, quantity = 1): void {
    const key = this.key(platformId, product.id);
    const next = new Map(this.lines());
    const existing = next.get(key);
    next.set(key, { product, quantity: (existing?.quantity ?? 0) + quantity });
    this.lines.set(next);
  }

  updateQuantity(platformId: string, productId: string, quantity: number): void {
    const key = this.key(platformId, productId);
    const next = new Map(this.lines());

    if (quantity <= 0) {
      next.delete(key);
    } else {
      const existing = next.get(key);
      if (existing) {
        next.set(key, { ...existing, quantity });
      }
    }

    this.lines.set(next);
  }

  removeItem(platformId: string, productId: string): void {
    const next = new Map(this.lines());
    next.delete(this.key(platformId, productId));
    this.lines.set(next);
  }

  clearPlatform(platformId: string): void {
    const next = new Map(this.lines());
    for (const key of next.keys()) {
      if (key.startsWith(`${platformId}:`)) {
        next.delete(key);
      }
    }
    this.lines.set(next);
  }

  private key(platformId: string, productId: string): string {
    return `${platformId}:${productId}`;
  }
}
