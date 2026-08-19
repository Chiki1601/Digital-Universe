import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-price',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss'
})
export class PriceComponent {
  readonly amount = input.required<number>();
  readonly originalAmount = input<number | null>(null);
  readonly currency = input('USD');

  protected readonly hasDiscount = computed(() => {
    const original = this.originalAmount();
    return original !== null && original > this.amount();
  });

  protected readonly discountPercent = computed(() => {
    const original = this.originalAmount();
    if (original === null || original <= 0) {
      return 0;
    }
    return Math.round(((original - this.amount()) / original) * 100);
  });
}
