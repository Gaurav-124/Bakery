/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/bakery_hero_1782930737870.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'c1',
    name: 'Gourmet Chocolate Fudge Cake',
    description: 'Double-layered rich chocolate cake layered with dark Belgian chocolate ganache, decorated with velvet curls and fresh raspberries.',
    category: 'cakes',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 142,
    image: '/src/assets/images/chocolate_cake_1782930753710.jpg',
    prepTime: '2 hours',
    allergens: ['Wheat', 'Dairy', 'Eggs', 'Soy'],
    tags: ['Best Seller', 'Chocolate', 'Fudge'],
    isSignature: true
  },
  {
    id: 'c2',
    name: 'Artisanal Raspberry Vanilla Cake',
    description: 'Light vanilla bean sponge cake filled with house-made raspberry compote and Swiss buttercream, finished with an elegant crimson glaze drip and fresh berries.',
    category: 'cakes',
    price: 42.00,
    rating: 4.8,
    reviewsCount: 98,
    image: '/src/assets/images/raspberry_cake_1782930767527.jpg',
    prepTime: '3 hours',
    allergens: ['Wheat', 'Dairy', 'Eggs'],
    tags: ['Signature', 'Fruit', 'Vanilla'],
    isSignature: true
  },
  {
    id: 'c3',
    name: 'Classic New York Cheesecake',
    description: 'Rich, dense, and ultra-creamy cheesecake on a toasted graham cracker crust, topped with a glossy mixed-berry compote.',
    category: 'cakes',
    price: 35.00,
    rating: 4.7,
    reviewsCount: 116,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
    prepTime: '1 hour',
    allergens: ['Dairy', 'Eggs', 'Wheat'],
    tags: ['Creamy', 'Classic'],
    isSignature: false
  },
  {
    id: 'p1',
    name: 'Classic Butter Croissant',
    description: 'Flaky, golden-brown French pastry made with pure Normandy butter, laminated 27 times to create the perfect airy honeycomb interior.',
    category: 'pastries',
    price: 4.25,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    prepTime: '15 mins',
    allergens: ['Wheat', 'Dairy', 'Eggs'],
    tags: ['Warm', 'Butter', 'French'],
    isSignature: true
  },
  {
    id: 'p2',
    name: 'Pistachio Cardamom Escargot',
    description: 'Crisp laminated pastry swirl filled with rich pistachio frangipane cream, dusted with crushed green pistachios and orange blossom water syrup.',
    category: 'pastries',
    price: 5.50,
    rating: 4.8,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600',
    prepTime: '20 mins',
    allergens: ['Wheat', 'Dairy', 'Nuts', 'Eggs'],
    tags: ['Nuts', 'Cardamom', 'Unique'],
    isSignature: false
  },
  {
    id: 'p3',
    name: 'Lemon Meringue Tartlet',
    description: 'Sweet shortcrust pastry filled with zesty Meyer lemon curd and piled high with toasted, fluffy Italian meringue.',
    category: 'pastries',
    price: 5.00,
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    prepTime: '10 mins',
    allergens: ['Wheat', 'Dairy', 'Eggs'],
    tags: ['Tart', 'Citrus', 'Sweet'],
    isSignature: false
  },
  {
    id: 'b1',
    name: 'Traditional Sourdough Boule',
    description: 'Slow-fermented for 36 hours using our 50-year-old wild yeast starter. Thick crust, soft open crumb, with a perfect sour tang.',
    category: 'breads',
    price: 7.50,
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    prepTime: 'Ready',
    allergens: ['Wheat'],
    tags: ['Vegan', 'Fermented', 'Artisanal'],
    isSignature: true
  },
  {
    id: 'b2',
    name: 'Olive & Rosemary Focaccia',
    description: 'Ligurian-style dimpled flatbread infused with extra virgin olive oil, topped with sea salt, kalamata olives, and fresh organic rosemary.',
    category: 'breads',
    price: 8.00,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    prepTime: '30 mins',
    allergens: ['Wheat'],
    tags: ['Savory', 'Olive oil'],
    isSignature: false
  },
  {
    id: 'b3',
    name: 'Braided Challah Loaf',
    description: 'Traditional enriched egg bread, beautifully braided, brushed with egg wash, and sprinkled with toasted sesame and poppy seeds.',
    category: 'breads',
    price: 8.50,
    rating: 4.7,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    prepTime: 'Ready',
    allergens: ['Wheat', 'Eggs'],
    tags: ['Sweet Bread', 'Soft'],
    isSignature: false
  },
  {
    id: 'ko1',
    name: 'Salted Caramel Pecan Cookies',
    description: 'Chewy brown-butter cookie dough loaded with toasted pecans, dark chocolate chunks, and a molten salted caramel center.',
    category: 'cookies',
    price: 3.75,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
    prepTime: '5 mins',
    allergens: ['Wheat', 'Dairy', 'Nuts', 'Eggs'],
    tags: ['Chewy', 'Caramel'],
    isSignature: true
  },
  {
    id: 'ko2',
    name: 'French Lavender Macaron Box',
    description: 'Elegant set of 6 light almond meringue cookies filled with white chocolate infused with organic French culinary lavender.',
    category: 'cookies',
    price: 14.00,
    rating: 4.6,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=600',
    prepTime: '5 mins',
    allergens: ['Nuts', 'Eggs', 'Dairy'],
    tags: ['Gluten-Free', 'Floral', 'Delicate'],
    isSignature: false
  }
];
