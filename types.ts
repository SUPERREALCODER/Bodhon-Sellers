
export type Category = 'All' | 'Fashion' | 'Food';

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'Fashion' | 'Food';
  subCategory: 'Watch' | 'Earring' | 'Bakery';
  price: number;
  rating: number;
  image: string;
  description: string;
  isPerishable: boolean;
  tier?: 'Premium' | 'Mid-range' | 'Budget';
  specifications?: string[];
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
  stats: string;
}
