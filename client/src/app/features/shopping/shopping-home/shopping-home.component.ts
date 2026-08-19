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
import { HeroBannerComponent } from '../../../platform-engine/components/hero-banner/hero-banner.component';
import { SearchComponent } from '../../../platform-engine/components/search/search.component';
import { FilterPanelComponent } from '../../../platform-engine/components/filter-panel/filter-panel.component';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { Category, ProductSummary } from '../models/product.model';
import { ProductGridComponent } from '../components/product-grid/product-grid.component';
import { PriceRangeFilterComponent, PriceRange } from '../components/price-range-filter/price-range-filter.component';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc';

@Component({
  selector: 'app-shopping-home',
  imports: [
    RouterLink,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    HeroBannerComponent,
    SearchComponent,
    FilterPanelComponent,
    ProductGridComponent,
    PriceRangeFilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-home.component.html',
  styleUrl: './shopping-home.component.scss'
})
export class ShoppingHomeComponent {
  private readonly platformService = inject(PlatformService);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly themeService = inject(ThemeService);
  protected readonly cartService = inject(CartService);
  protected readonly wishlistService = inject(WishlistService);

  private readonly route = inject(ActivatedRoute);
  private readonly parentParams = toSignal(this.route.parent!.paramMap, {
    initialValue: this.route.parent!.snapshot.paramMap
  });
  protected readonly platformId = computed(() => this.parentParams().get('platformId') ?? '');

  protected readonly platform = signal<RequestState<PlatformConfiguration>>(initialRequestState());
  protected readonly products = signal<RequestState<ProductSummary[]>>(initialRequestState());
  protected readonly categories = signal<Category[]>([]);

  protected readonly searchQuery = signal('');
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly sortBy = signal<SortOption>('relevance');
  protected readonly priceRange = signal<PriceRange>({ min: 0, max: 0 });

  private readonly categoryNameById = computed(
    () => new Map(this.categories().map((category) => [category.id, category.name]))
  );

  protected readonly categoryOptions = computed(() => this.categories().map((category) => category.name));

  protected readonly priceBounds = computed<PriceRange>(() => {
    const prices = (this.products().data ?? []).map((product) => product.price);
    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  });

  protected readonly filteredProducts = computed(() => {
    const items = this.products().data ?? [];
    const query = this.searchQuery().trim().toLowerCase();
    const categoryName = this.selectedCategory();
    const range = this.priceRange();
    const nameById = this.categoryNameById();

    const filtered = items.filter((product) => {
      const matchesQuery = !query || product.name.toLowerCase().includes(query);
      const matchesCategory = !categoryName || nameById.get(product.categoryId) === categoryName;
      const matchesPrice = product.price >= range.min && product.price <= range.max;
      return matchesQuery && matchesCategory && matchesPrice;
    });

    return this.sortProducts(filtered);
  });

  protected readonly cartCount = computed(() =>
    this.cartService.linesForPlatform(this.platformId()).reduce((total, line) => total + line.quantity, 0)
  );

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => this.themeService.setPlatformTheme(null));
  }

  protected load(): void {
    const id = this.platformId();
    if (!id) {
      return;
    }

    this.platform.set({ data: null, loading: true, error: null });
    this.products.set({ data: null, loading: true, error: null });

    this.platformService.getPlatformConfiguration(id).subscribe({
      next: (config) => {
        this.platform.set({ data: config, loading: false, error: null });
        this.themeService.setPlatformTheme(config.theme);
      },
      error: (err: Error) => this.platform.set({ data: null, loading: false, error: err.message })
    });

    this.productService.getByPlatform(id).subscribe({
      next: (items) => {
        this.products.set({ data: items, loading: false, error: null });
        const prices = items.map((item) => item.price);
        if (prices.length > 0) {
          this.priceRange.set({ min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) });
        }
      },
      error: (err: Error) => this.products.set({ data: null, loading: false, error: err.message })
    });

    this.categoryService.getByPlatform(id).subscribe((items) => this.categories.set(items));
  }

  protected onAddToCart(productId: string): void {
    const product = this.products().data?.find((item) => item.id === productId);
    if (product) {
      this.cartService.addItem(this.platformId(), product, 1);
    }
  }

  private sortProducts(items: ProductSummary[]): ProductSummary[] {
    const sorted = [...items];
    switch (this.sortBy()) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }
}
