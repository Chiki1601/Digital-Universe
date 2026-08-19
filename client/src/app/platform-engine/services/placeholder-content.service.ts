import { Injectable } from '@angular/core';
import { MediaItem, SectionConfig } from '../models';

const ITEMS_PER_SECTION = 8;

/**
 * Stands in for the real Content/Product/Post APIs that arrive in later phases
 * (OTT, Shopping, Social, Music, ...). Generates deterministic placeholder items
 * so the Section Renderer has something to render today without a real content
 * source. Deterministic (no Math.random) so the same section always renders the
 * same items, which keeps demos and tests stable.
 */
@Injectable({ providedIn: 'root' })
export class PlaceholderContentService {
  itemsForSection(section: SectionConfig, platformId: string): MediaItem[] {
    const label = section.title ?? 'Featured';

    return Array.from({ length: ITEMS_PER_SECTION }, (_, i) => {
      const index = i + 1;
      return {
        id: `${platformId}-${section.type}-${section.order}-${index}`,
        title: `${label} ${index}`,
        subtitle: platformId,
        rating: Math.round((3 + ((index * 7) % 20) / 10) * 10) / 10,
        accentIndex: index % 6
      };
    });
  }
}
