import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatformService } from '../../../core/services/platform.service';
import { ThemeService } from '../../../core/services/theme.service';
import { RequestState, initialRequestState } from '../../../core/models';
import { PlatformConfiguration } from '../../../platform-engine/models';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state.component';
import { RatingComponent } from '../../../platform-engine/components/rating/rating.component';
import { VideoPlayerComponent } from '../../../platform-engine/components/video-player/video-player.component';
import { ContentService } from '../services/content.service';
import { WatchlistService } from '../services/watchlist.service';
import { ContinueWatchingService } from '../services/continue-watching.service';
import { ContentDetail, ContentSummary } from '../models/content.model';
import { MovieRowComponent } from '../components/movie-row/movie-row.component';

@Component({
  selector: 'app-movie-detail',
  imports: [
    RouterLink,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    RatingComponent,
    VideoPlayerComponent,
    MovieRowComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  private readonly platformService = inject(PlatformService);
  private readonly contentService = inject(ContentService);
  private readonly themeService = inject(ThemeService);
  protected readonly watchlistService = inject(WatchlistService);
  protected readonly continueWatchingService = inject(ContinueWatchingService);

  private readonly route = inject(ActivatedRoute);
  private readonly parentParams = toSignal(this.route.parent!.paramMap, {
    initialValue: this.route.parent!.snapshot.paramMap
  });
  private readonly ownParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  protected readonly platformId = computed(() => this.parentParams().get('platformId') ?? '');
  protected readonly contentId = computed(() => this.ownParams().get('contentId') ?? '');

  protected readonly platform = signal<RequestState<PlatformConfiguration>>(initialRequestState());
  protected readonly content = signal<RequestState<ContentDetail>>(initialRequestState());
  protected readonly moreLikeThis = signal<ContentSummary[]>([]);

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => this.themeService.setPlatformTheme(null));
  }

  protected load(): void {
    const platformId = this.platformId();
    const contentId = this.contentId();
    if (!platformId || !contentId) {
      return;
    }

    this.platform.set({ data: null, loading: true, error: null });
    this.content.set({ data: null, loading: true, error: null });
    this.moreLikeThis.set([]);

    this.platformService.getPlatformConfiguration(platformId).subscribe({
      next: (config) => {
        this.platform.set({ data: config, loading: false, error: null });
        this.themeService.setPlatformTheme(config.theme);
      },
      error: (err: Error) => this.platform.set({ data: null, loading: false, error: err.message })
    });

    this.contentService.getById(contentId).subscribe({
      next: (detail) => this.content.set({ data: detail, loading: false, error: null }),
      error: (err: Error) => this.content.set({ data: null, loading: false, error: err.message })
    });

    this.contentService.getByPlatform(platformId).subscribe((items) => {
      this.moreLikeThis.set(items.filter((item) => item.id !== contentId).slice(0, 8));
    });
  }

  protected toggleWatchlist(): void {
    this.watchlistService.toggle(this.contentId());
  }

  protected onProgressChange(percent: number): void {
    this.continueWatchingService.setProgress(this.contentId(), percent);
  }
}
