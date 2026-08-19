import { Injectable, signal } from '@angular/core';

/**
 * In-memory watchlist state (no backend persistence - there's no user account
 * system yet). Resets on page reload, which is expected for a no-database demo.
 */
@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly ids = signal<ReadonlySet<string>>(new Set());
  readonly watchlist = this.ids.asReadonly();

  has(contentId: string): boolean {
    return this.ids().has(contentId);
  }

  toggle(contentId: string): void {
    const next = new Set(this.ids());
    if (next.has(contentId)) {
      next.delete(contentId);
    } else {
      next.add(contentId);
    }
    this.ids.set(next);
  }
}
