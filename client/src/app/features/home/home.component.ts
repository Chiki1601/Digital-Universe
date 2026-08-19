import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';
import { ThemeApiService } from '../../core/services/theme-api.service';
import { ThemeService } from '../../core/services/theme.service';
import { PlatformSummary, ThemeConfig } from '../../platform-engine/models';
import { RequestState, initialRequestState } from '../../core/models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

interface PlatformCategoryTile {
  id: string;
  label: string;
  icon: string;
  description: string;
  examples: string;
}

interface TechBadge {
  label: string;
  group: 'Frontend' | 'Backend';
}

interface ComponentShowcaseItem {
  name: string;
  description: string;
}

interface ArchitectureStep {
  step: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, EmptyStateComponent, ErrorStateComponent, SkeletonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly platformService = inject(PlatformService);
  private readonly themeApiService = inject(ThemeApiService);
  protected readonly themeService = inject(ThemeService);

  protected readonly featured = signal<RequestState<PlatformSummary[]>>(initialRequestState());
  protected readonly themes = signal<RequestState<ThemeConfig[]>>(initialRequestState());

  protected readonly categories: PlatformCategoryTile[] = [
    { id: 'ott', label: 'OTT / Streaming', icon: '🎬', description: 'Cinematic video-on-demand experiences.', examples: 'CineVerse, StreamBox, SeriesWorld' },
    { id: 'music', label: 'Music', icon: '🎧', description: 'Audio-first discovery and playback.', examples: 'SoundWave, TuneSpace' },
    { id: 'social', label: 'Social Media', icon: '💬', description: 'Feeds, stories, and connection.', examples: 'SocialHub, Connectly, ProNetwork' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', description: 'Product discovery and checkout.', examples: 'ShopSphere, FashionHub, MarketZone' },
    { id: 'news', label: 'News / Content', icon: '📰', description: 'Editorial storytelling at scale.', examples: 'NewsSpace, DailySphere' },
    { id: 'creator', label: 'Creator Platforms', icon: '🎨', description: 'Publishing tools for creators.', examples: 'CreatorSpace, ContentHub' },
    { id: 'professional', label: 'Professional Networking', icon: '💼', description: 'Careers, jobs, and connections.', examples: 'CareerConnect, WorkSphere' }
  ];

  protected readonly architecture: ArchitectureStep[] = [
    { step: 'Platform Configuration', description: 'A JSON-shaped config declares theme, layout, and section list per platform.' },
    { step: 'Platform Engine', description: 'Angular resolves the config and prepares theme + layout context.' },
    { step: 'Section Renderer', description: 'A dynamic renderer walks the section list and picks a component per type.' },
    { step: 'Dynamic Angular Components', description: 'Reusable components (HeroBanner, Carousel, MediaCard...) render each section.' },
    { step: 'Rendered Platform Experience', description: 'The same engine outputs 17 distinct, fully themed digital experiences.' }
  ];

  protected readonly techStack: TechBadge[] = [
    { label: 'Angular 22', group: 'Frontend' },
    { label: 'TypeScript', group: 'Frontend' },
    { label: 'Signals', group: 'Frontend' },
    { label: 'RxJS', group: 'Frontend' },
    { label: 'Standalone Components', group: 'Frontend' },
    { label: 'Reactive Forms', group: 'Frontend' },
    { label: 'SCSS', group: 'Frontend' },
    { label: 'ASP.NET Core Web API', group: 'Backend' },
    { label: 'C#', group: 'Backend' },
    { label: 'JWT Auth', group: 'Backend' },
    { label: 'SignalR', group: 'Backend' },
    { label: 'In-Memory Services', group: 'Backend' }
  ];

  protected readonly componentShowcase: ComponentShowcaseItem[] = [
    { name: 'HeroBannerComponent', description: 'Full-bleed hero used across OTT, shopping, and creator platforms.' },
    { name: 'ContentCarouselComponent', description: 'Horizontally scrollable rail for movies, tracks, products, or posts.' },
    { name: 'MediaCardComponent', description: 'Shared card shell adapted per platform via the theme engine.' },
    { name: 'ProductGridComponent', description: 'Responsive catalog grid reused across all three shopping platforms.' },
    { name: 'PostCardComponent', description: 'Social feed card with likes, comments, and shares.' },
    { name: 'MusicPlayerComponent', description: 'Mini and full-screen playback UI backed by AudioPlayerService.' }
  ];

  constructor() {
    this.loadFeatured();
    this.loadThemes();
    inject(DestroyRef).onDestroy(() => this.themeService.setPlatformTheme(null));
  }

  protected loadFeatured(): void {
    this.featured.set({ data: null, loading: true, error: null });

    this.platformService.getAllPlatforms().subscribe({
      next: (platforms) => this.featured.set({ data: platforms.slice(0, 6), loading: false, error: null }),
      error: (err: Error) => this.featured.set({ data: null, loading: false, error: err.message })
    });
  }

  protected loadThemes(): void {
    this.themes.set({ data: null, loading: true, error: null });

    this.themeApiService.getAllThemes().subscribe({
      next: (themes) => this.themes.set({ data: themes, loading: false, error: null }),
      error: (err: Error) => this.themes.set({ data: null, loading: false, error: err.message })
    });
  }

  protected previewTheme(theme: ThemeConfig): void {
    const active = this.themeService.activePlatformTheme();
    this.themeService.setPlatformTheme(active?.id === theme.id ? null : theme);
  }
}
