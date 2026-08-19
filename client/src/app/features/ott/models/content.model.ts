export type ContentType = 'Movie' | 'Series';

export interface ContentSummary {
  id: string;
  platformId: string;
  title: string;
  type: ContentType;
  genres: string[];
  rating: number;
  isTrending: boolean;
  isPopular: boolean;
  accentIndex: number;
}

export interface ContentDetail {
  id: string;
  platformId: string;
  title: string;
  type: ContentType;
  genres: string[];
  synopsis: string;
  releaseYear: number;
  runtime: string;
  rating: number;
  accentIndex: number;
}
