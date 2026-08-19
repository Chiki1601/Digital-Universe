import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface PriceRange {
  min: number;
  max: number;
}

@Component({
  selector: 'app-price-range-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './price-range-filter.component.html',
  styleUrl: './price-range-filter.component.scss'
})
export class PriceRangeFilterComponent {
  readonly bounds = input.required<PriceRange>();
  readonly value = input.required<PriceRange>();
  readonly rangeChange = output<PriceRange>();

  onMinChange(raw: string): void {
    const min = Number(raw);
    this.rangeChange.emit({ min, max: Math.max(min, this.value().max) });
  }

  onMaxChange(raw: string): void {
    const max = Number(raw);
    this.rangeChange.emit({ min: Math.min(this.value().min, max), max });
  }
}
