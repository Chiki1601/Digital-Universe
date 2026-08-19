import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '../../../core/services/platform.service';
import { ThemeService } from '../../../core/services/theme.service';
import { RequestState, initialRequestState } from '../../../core/models';
import { PlatformConfiguration } from '../../../platform-engine/models';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state.component';
import { HeroBannerComponent } from '../../../platform-engine/components/hero-banner/hero-banner.component';
import { SearchComponent } from '../../../platform-engine/components/search/search.component';
import { FilterPanelComponent } from '../../../platform-engine/components/filter-panel/filter-panel.component';
import { ContentService } from '../services/content.service';
import { WatchlistService } from '../services/watchlist.service';
import { ContinueWatchingService } from '../services/continue-watching.service';
import { ContentSummary } from '../models/content.model';
import { MovieRowComponent } from '../components/movie-row/movie-row.component';

@Component({
  selector: 'app-ott-home',
  imports: [
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    HeroBannerComponent,
    SearchComponent,
    FilterPanelComponent,
    MovieRowComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ott-home.component.html',
  styleUrl: './ott-home.component.scss'
})
export class OttHomeComponent {
  private readonly platformService = inject(PlatformService);
  private readonly contentService = inject(ContentService);
  private readonly themeService = inject(ThemeService);
  protected readonly watchlistService = inject(WatchlistService);
  protected readonly continueWatchingService = inject(ContinueWatchingService);

  private readonly route = inject(ActivatedRoute);
  private readonly parentParams = toSignal(this.route.parent!.paramMap, {
    initialValue: this.route.parent!.snapshot.paramMap
  });
  protected readonly platformId = computed(() => this.parentParams().get('platformId') ?? '');

  protected readonly platform = signal<RequestState<PlatformConfiguration>>(initialRequestState());
  protected readonly content = signal<RequestState<ContentSummary[]>>(initialRequestState());

  protected readonly searchQuery = signal('');
  protected readonly selectedGenre = signal<string | null>(null);

  protected readonly genres = computed(() => {
    const items = this.content().data ?? [];
    return [...new Set(items.flatMap((item) => item.genres))].sort();
  });

  protected readonly filteredContent = computed(() => {
    const items = this.content().data ?? [];
    const query = this.searchQuery().trim().toLowerCase();
    const genre = this.selectedGenre();

    return items.filter((item) => {
      const matchesQuery = !query || item.title.toLowerCase().includes(query);
      const matchesGenre = !genre || item.genres.includes(genre);
      return matchesQuery && matchesGenre;
    });
  });

  protected readonly trending = computed(() => this.filteredContent().filter((item) => item.isTrending));
  protected readonly popular = computed(() => this.filteredContent().filter((item) => item.isPopular));

  protected readonly continueWatchingItems = computed(() => {
    const progress = this.continueWatchingService.progress();
    return (this.content().data ?? []).filter((item) => progress.has(item.id));
  });

  protected readonly watchlistItems = computed(() => {
    const watchlist = this.watchlistService.watchlist();
    return (this.content().data ?? []).filter((item) => watchlist.has(item.id));
  });

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => this.themeService.setPlatformTheme(null));
  }

  protected load(): void {
    const id = this.platformId();
    if (!id) {
      return;
    }

    this.platform.set({ data: null, loading: true, error: null });
    this.content.set({ data: null, loading: true, error: null });

    this.platformService.getPlatformConfiguration(id).subscribe({
      next: (config) => {
        this.platform.set({ data: config, loading: false, error: null });
        this.themeService.setPlatformTheme(config.theme);
      },
      error: (err: Error) => this.platform.set({ data: null, loading: false, error: err.message })
    });

    this.contentService.getByPlatform(id).subscribe({
      next: (items) => this.content.set({ data: items, loading: false, error: null }),
      error: (err: Error) => this.content.set({ data: null, loading: false, error: err.message })
    });
  }

  protected toggleWatchlist(contentId: string): void {
    this.watchlistService.toggle(contentId);
  }
}
