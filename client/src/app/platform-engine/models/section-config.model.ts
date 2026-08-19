export type SectionType = 'hero' | 'carousel' | 'stories';

export interface SectionConfig {
  type: SectionType;
  title?: string;
  order: number;
}
