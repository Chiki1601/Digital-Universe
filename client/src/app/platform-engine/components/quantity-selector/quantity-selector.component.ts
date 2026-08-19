import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss'
})
export class QuantitySelectorComponent {
  readonly value = input(1);
  readonly min = input(1);
  readonly max = input(99);
  readonly valueChange = output<number>();

  decrement(): void {
    if (this.value() > this.min()) {
      this.valueChange.emit(this.value() - 1);
    }
  }

  increment(): void {
    if (this.value() < this.max()) {
      this.valueChange.emit(this.value() + 1);
    }
  }
}
