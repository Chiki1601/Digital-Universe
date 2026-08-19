export interface Category {
  id: string;
  platformId: string;
  name: string;
  icon: string;
}

export interface ProductSummary {
  id: string;
  platformId: string;
  categoryId: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  accentIndex: number;
}

export interface ProductDetail {
  id: string;
  platformId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  accentIndex: number;
}
