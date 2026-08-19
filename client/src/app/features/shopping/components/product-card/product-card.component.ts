import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PriceComponent } from '../../../../platform-engine/components/price/price.component';
import { RatingComponent } from '../../../../platform-engine/components/rating/rating.component';
import { ProductSummary } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, PriceComponent, RatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  readonly product = input.required<ProductSummary>();
  readonly inWishlist = input(false);

  readonly wishlistToggle = output<void>();
  readonly addToCart = output<void>();

  onWishlistClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistToggle.emit();
  }

  onAddToCartClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.addToCart.emit();
  }
}
