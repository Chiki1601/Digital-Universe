import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ProductSummary } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss'
})
export class ProductGridComponent {
  readonly products = input.required<ProductSummary[]>();
  readonly wishlistIds = input<ReadonlySet<string>>(new Set());

  readonly wishlistToggle = output<string>();
  readonly addToCart = output<string>();
}
