import { LayoutConfig } from './layout-config.model';
import { PlatformCategory } from './platform-category.model';
import { SectionConfig } from './section-config.model';
import { ThemeConfig } from './theme-config.model';

export interface PlatformSummary {
  id: string;
  name: string;
  category: PlatformCategory;
  tagline: string;
  themeId: string;
}

export interface PlatformConfiguration {
  platformId: string;
  name: string;
  category: PlatformCategory;
  tagline: string;
  description: string;
  theme: ThemeConfig;
  layout: LayoutConfig;
  sections: SectionConfig[];
}
