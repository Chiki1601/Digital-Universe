import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PriceComponent } from '../../../platform-engine/components/price/price.component';
import { QuantitySelectorComponent } from '../../../platform-engine/components/quantity-selector/quantity-selector.component';
import { CartService, calculateCartTotals } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, EmptyStateComponent, PriceComponent, QuantitySelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  protected readonly cartService = inject(CartService);

  private readonly route = inject(ActivatedRoute);
  private readonly parentParams = toSignal(this.route.parent!.paramMap, {
    initialValue: this.route.parent!.snapshot.paramMap
  });
  protected readonly platformId = computed(() => this.parentParams().get('platformId') ?? '');

  protected readonly lines = computed(() => this.cartService.linesForPlatform(this.platformId()));
  protected readonly totals = computed(() => calculateCartTotals(this.lines()));

  protected updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(this.platformId(), productId, quantity);
  }

  protected removeItem(productId: string): void {
    this.cartService.removeItem(this.platformId(), productId);
  }
}
