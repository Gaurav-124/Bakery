/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'pastries' | 'breads' | 'cookies';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  prepTime: string;
  allergens: string[];
  tags: string[];
  isSignature?: boolean;
}

export interface CustomCake {
  id: string;
  tiers: 1 | 2 | 3;
  baseFlavor: string;
  frosting: string;
  toppings: string[];
  message: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. productId_size_writing or custom_cake_id)
  product?: Product;
  customCake?: CustomCake;
  quantity: number;
  size?: '6 inch' | '8 inch' | '10 inch'; // for cakes only
  writing?: string; // custom text on cake
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress: string;
  paymentMethod: 'card' | 'cash';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'baking' | 'decorating' | 'ready' | 'completed';
  timestamp: string;
}
