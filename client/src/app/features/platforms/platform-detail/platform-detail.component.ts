import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatformService } from '../../../core/services/platform.service';
import { ThemeService } from '../../../core/services/theme.service';
import { PlatformConfiguration } from '../../../platform-engine/models';
import { RequestState, initialRequestState } from '../../../core/models';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state.component';
import { SectionRendererComponent } from '../../../platform-engine/renderers/section-renderer.component';
import { SearchComponent } from '../../../platform-engine/components/search/search.component';
import { SidebarComponent, SidebarLink } from '../../../platform-engine/components/sidebar/sidebar.component';

const GENERIC_SIDEBAR_LINKS: SidebarLink[] = [
  { label: 'Overview', icon: '⭐' },
  { label: 'Trending', icon: '🔥' },
  { label: 'New', icon: '✨' },
  { label: 'For You', icon: '🎯' }
];

@Component({
  selector: 'app-platform-detail',
  imports: [
    RouterLink,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    SectionRendererComponent,
    SearchComponent,
    SidebarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './platform-detail.component.html',
  styleUrl: './platform-detail.component.scss'
})
export class PlatformDetailComponent {
  private readonly platformService = inject(PlatformService);
  private readonly themeService = inject(ThemeService);
  private readonly route = inject(ActivatedRoute);

  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  protected readonly platformId = computed(() => this.params().get('platformId') ?? '');

  protected readonly configuration = signal<RequestState<PlatformConfiguration>>(initialRequestState());
  protected readonly searchQuery = signal('');
  protected readonly sidebarLinks = GENERIC_SIDEBAR_LINKS;

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => this.themeService.setPlatformTheme(null));
  }

  protected load(): void {
    const id = this.platformId();
    if (!id) {
      return;
    }

    this.searchQuery.set('');
    this.configuration.set({ data: null, loading: true, error: null });

    this.platformService.getPlatformConfiguration(id).subscribe({
      next: (config) => {
        this.configuration.set({ data: config, loading: false, error: null });
        this.themeService.setPlatformTheme(config.theme);
      },
      error: (err: Error) => this.configuration.set({ data: null, loading: false, error: err.message })
    });
  }
}
