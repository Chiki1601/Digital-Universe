import { Injectable, signal } from '@angular/core';

/**
 * In-memory wishlist state (no backend persistence - there's no user account
 * system yet). Resets on page reload, which is expected for a no-database demo.
 */
@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly ids = signal<ReadonlySet<string>>(new Set());
  readonly wishlist = this.ids.asReadonly();

  has(productId: string): boolean {
    return this.ids().has(productId);
  }

  toggle(productId: string): void {
    const next = new Set(this.ids());
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    this.ids.set(next);
  }
}
