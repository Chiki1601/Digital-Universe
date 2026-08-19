import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PlatformConfiguration, SectionConfig } from '../models';
import { PlaceholderContentService } from '../services/placeholder-content.service';
import { ContentCarouselComponent } from '../components/content-carousel/content-carousel.component';
import { HeroBannerComponent } from '../components/hero-banner/hero-banner.component';

/**
 * The heart of the Platform Engine: walks a platform's section list and picks
 * the right reusable component per section type. This is what turns a JSON
 * configuration into a rendered experience without any platform-specific code.
 */
@Component({
  selector: 'app-section-renderer',
  imports: [HeroBannerComponent, ContentCarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section-renderer.component.html'
})
export class SectionRendererComponent {
  private readonly placeholderContent = inject(PlaceholderContentService);

  readonly platform = input.required<PlatformConfiguration>();

  protected itemsFor(section: SectionConfig) {
    return this.placeholderContent.itemsForSection(section, this.platform().platformId);
  }
}
