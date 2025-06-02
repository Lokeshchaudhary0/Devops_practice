export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  badge?: string;
  inStock: boolean;
  freeDelivery?: boolean;
  specifications: { name: string; value: string }[];
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories?: { id: string; name: string }[];
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}