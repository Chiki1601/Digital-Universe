import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatformService } from '../../../core/services/platform.service';
import { PlatformSummary } from '../../../platform-engine/models';
import { RequestState, initialRequestState } from '../../../core/models';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { SkeletonLoaderComponent } from '../../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-platform-list',
  imports: [RouterLink, TitleCasePipe, EmptyStateComponent, ErrorStateComponent, SkeletonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './platform-list.component.html',
  styleUrl: './platform-list.component.scss'
})
export class PlatformListComponent {
  private readonly platformService = inject(PlatformService);
  private readonly route = inject(ActivatedRoute);

  private readonly categoryParam = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  protected readonly category = computed(() => this.categoryParam().get('category'));

  protected readonly platforms = signal<RequestState<PlatformSummary[]>>(initialRequestState());

  protected readonly filtered = computed(() => {
    const category = this.category();
    const data = this.platforms().data ?? [];
    return category ? data.filter((p) => p.category.toLowerCase() === category.toLowerCase()) : data;
  });

  constructor() {
    this.load();
  }

  protected load(): void {
    this.platforms.set({ data: null, loading: true, error: null });

    this.platformService.getAllPlatforms().subscribe({
      next: (platforms) => this.platforms.set({ data: platforms, loading: false, error: null }),
      error: (err: Error) => this.platforms.set({ data: null, loading: false, error: err.message })
    });
  }
}
