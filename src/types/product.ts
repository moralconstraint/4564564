export type Platform = 'windows' | 'xbox' | 'playstation';

export type ProductStatus = 'undetected' | 'detected' | 'updating';

export type ProductCategory = 'unlock' | 'software';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  image: string;
  rating: number;
  securityRating: number;
  platforms: Platform[];
  category: ProductCategory;
  noSubscription?: boolean;
  features?: string[];
  requirements?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  tiers?: {
    basic: {
      name: string;
      price: number;
      features: string[];
    };
    vip: {
      name: string;
      price: number;
      features: string[];
    };
    gold: {
      name: string;
      price: number;
      features: string[];
    };
  };
  durations?: Array<{
    months: number;
    name: string;
    discount: number;
  }>;
}