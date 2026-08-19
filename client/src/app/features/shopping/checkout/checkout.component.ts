import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PriceComponent } from '../../../platform-engine/components/price/price.component';
import { CartService, CartTotals, calculateCartTotals } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule, PriceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  private readonly formBuilder = inject(FormBuilder);

  private readonly route = inject(ActivatedRoute);
  private readonly parentParams = toSignal(this.route.parent!.paramMap, {
    initialValue: this.route.parent!.snapshot.paramMap
  });
  protected readonly platformId = computed(() => this.parentParams().get('platformId') ?? '');

  protected readonly lines = computed(() => this.cartService.linesForPlatform(this.platformId()));
  protected readonly totals = computed(() => calculateCartTotals(this.lines()));

  protected readonly orderPlaced = signal(false);
  protected readonly placedOrderTotals = signal<CartTotals | null>(null);
  protected readonly placedItemCount = signal(0);

  protected readonly form = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    addressLine: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required]
  });

  protected submit(): void {
    if (this.form.invalid || this.lines().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    this.placedOrderTotals.set(this.totals());
    this.placedItemCount.set(this.lines().reduce((count, line) => count + line.quantity, 0));
    this.cartService.clearPlatform(this.platformId());
    this.orderPlaced.set(true);
  }
}
