import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
  readonly count = input(1);
  readonly height = input('1rem');
  readonly width = input('100%');

  readonly items = computed(() => Array.from({ length: this.count() }, (_, index) => index));
}
