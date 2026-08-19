import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatformService } from '../../../core/services/platform.service';
import { ThemeService } from '../../../core/services/theme.service';
import { RequestState, initialRequestState } from '../../../core/models';
import { PlatformConfiguration } from '../../../platform-engine/models';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state.component';
import { RatingComponent } from '../../../platform-engine/components/rating/rating.component';
import { PriceComponent } from '../../../platform-engine/components/price/price.component';
import { QuantitySelectorComponent } from '../../../platform-engine/components/quantity-selector/quantity-selector.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductDetail, ProductSummary } from '../models/product.model';
import { ProductGridComponent } from '../components/product-grid/product-grid.component';

@Component({
  selector: 'app-product-detail',
  imports: [
    RouterLink,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    RatingComponent,
    PriceComponent,
    QuantitySelectorComponent,
    ProductGridComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private readonly platformService = inject(PlatformService);
  private readonly productService = inject(ProductService);
  private readonly themeService = inject(ThemeService);
  protected readonly cartService = inject(CartService);
  protected readonly wishlistService = inject(WishlistService);

  private readonly route = inject(ActivatedRoute);
  private readonly parentParams = toSignal(this.route.parent!.paramMap, {
    initialValue: this.route.parent!.snapshot.paramMap
  });
  private readonly ownParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  protected readonly platformId = computed(() => this.parentParams().get('platformId') ?? '');
  protected readonly productId = computed(() => this.ownParams().get('productId') ?? '');

  protected readonly platform = signal<RequestState<PlatformConfiguration>>(initialRequestState());
  protected readonly product = signal<RequestState<ProductDetail>>(initialRequestState());
  protected readonly related = signal<ProductSummary[]>([]);

  protected readonly quantity = signal(1);
  protected readonly selectedThumbnail = signal(0);
  protected readonly thumbnails = [0, 1, 2, 3];

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => this.themeService.setPlatformTheme(null));
  }

  protected load(): void {
    const platformId = this.platformId();
    const productId = this.productId();
    if (!platformId || !productId) {
      return;
    }

    this.platform.set({ data: null, loading: true, error: null });
    this.product.set({ data: null, loading: true, error: null });
    this.related.set([]);
    this.quantity.set(1);
    this.selectedThumbnail.set(0);

    this.platformService.getPlatformConfiguration(platformId).subscribe({
      next: (config) => {
        this.platform.set({ data: config, loading: false, error: null });
        this.themeService.setPlatformTheme(config.theme);
      },
      error: (err: Error) => this.platform.set({ data: null, loading: false, error: err.message })
    });

    this.productService.getById(productId).subscribe({
      next: (detail) => this.product.set({ data: detail, loading: false, error: null }),
      error: (err: Error) => this.product.set({ data: null, loading: false, error: err.message })
    });

    this.productService.getByPlatform(platformId).subscribe((items) => {
      this.related.set(items.filter((item) => item.id !== productId).slice(0, 8));
    });
  }

  protected addToCart(): void {
    const detail = this.product().data;
    if (!detail) {
      return;
    }

    const summary: ProductSummary = {
      id: detail.id,
      platformId: detail.platformId,
      categoryId: detail.categoryId,
      name: detail.name,
      price: detail.price,
      originalPrice: detail.originalPrice,
      rating: detail.rating,
      reviewCount: detail.reviewCount,
      inStock: detail.inStock,
      accentIndex: detail.accentIndex
    };

    this.cartService.addItem(this.platformId(), summary, this.quantity());
  }

  protected toggleWishlist(): void {
    this.wishlistService.toggle(this.productId());
  }

  protected addRelatedToCart(productId: string): void {
    const product = this.related().find((item) => item.id === productId);
    if (product) {
      this.cartService.addItem(this.platformId(), product, 1);
    }
  }
}
