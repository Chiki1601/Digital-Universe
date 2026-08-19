import { Injectable, signal } from '@angular/core';

const SEEDED_PROGRESS: ReadonlyArray<[string, number]> = [
  ['cineverse-echoes-of-tomorrow', 42],
  ['streambox-fractured-skies', 68],
  ['seriesworld-the-obsidian-circle', 25]
];

/**
 * In-memory "continue watching" progress, seeded with a few demo entries so the
 * row isn't empty on first load. No backend persistence - resets on reload.
 */
@Injectable({ providedIn: 'root' })
export class ContinueWatchingService {
  private readonly progressById = signal<ReadonlyMap<string, number>>(new Map(SEEDED_PROGRESS));
  readonly progress = this.progressById.asReadonly();

  getProgress(contentId: string): number | undefined {
    return this.progressById().get(contentId);
  }

  setProgress(contentId: string, percent: number): void {
    const next = new Map(this.progressById());
    next.set(contentId, Math.min(100, Math.max(0, percent)));
    this.progressById.set(next);
  }
}
