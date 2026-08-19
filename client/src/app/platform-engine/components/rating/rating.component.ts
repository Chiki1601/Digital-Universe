import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  readonly value = input.required<number>();
  readonly max = input(5);

  protected readonly stars = computed(() =>
    Array.from({ length: this.max() }, (_, i) => i < Math.round(this.value()))
  );
}
