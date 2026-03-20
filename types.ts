export type MenuCategory = 'Coffee' | 'Matcha' | 'Artisanal Tea' | 'Breakfast' | 'Mains' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian?: boolean;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
}

export interface SignatureItem {
  id: string;
  name: string;
  description: string;
  image: string;
}