/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ChevronLeft, ChevronRight, Award, Flame, Heart, ShoppingBag } from 'lucide-react';

import { Product, CartItem, CustomCake, Order } from './types';
import { PRODUCTS } from './data/products';

import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CakeCustomizer from './components/CakeCustomizer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTracker from './components/OrderTracker';

export default function App() {
  // Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  // Shopping States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Modal Control States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync cart from local storage on launch
  useEffect(() => {
    const savedCart = localStorage.getItem('maison_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load saved cart', e);
      }
    }
    
    // Sync latest order if available
    const savedOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
    if (savedOrders.length > 0) {
      setActiveOrder(savedOrders[0]);
    }
  }, []);

  // Save cart changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('maison_cart', JSON.stringify(newCart));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size?: '6 inch' | '8 inch' | '10 inch', writing?: string, quantity: number = 1) => {
    const isCake = product.category === 'cakes';
    const compoundId = isCake 
      ? `${product.id}_${size || '6 inch'}_${writing || ''}` 
      : product.id;

    const existingIndex = cart.findIndex(item => item.id === compoundId);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: compoundId,
        product,
        quantity,
        size: isCake ? (size || '6 inch') : undefined,
        writing: isCake ? writing : undefined
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleQuickAdd = (product: Product) => {
    // defaults for quick addition: 6 inch if cake
    handleAddToCart(
      product, 
      product.category === 'cakes' ? '6 inch' : undefined, 
      undefined, 
      1
    );
  };

  const handleAddCustomCakeToCart = (customCake: CustomCake) => {
    const compoundId = customCake.id;
    const newItem: CartItem = {
      id: compoundId,
      customCake,
      quantity: 1
    };
    saveCart([...cart, newItem]);
    setIsCartOpen(true); // reveal cart drawer instantly
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveCartItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    saveCart(updated);
  };

  // Checkout Done Handlers
  const handleOrderCompleted = (completedOrder: Order) => {
    setActiveOrder(completedOrder);
    saveCart([]); // clear cart bag
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsTrackerOpen(true); // transition directly to active tracker
  };

  // Search filter lists
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return b.rating - a.rating; // default: best sellers / popular
  });

  const signatureProducts = PRODUCTS.filter(p => p.isSignature);

  return (
    <div id="main-bakery-store" className="min-h-screen flex flex-col justify-between bg-bakery-cream selection:bg-amber-200/50 selection:text-bakery-dark">
      
      {/* Header element */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onSearch={(term) => setSearchTerm(term)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main showcase area */}
      <main className="flex-1">
        
        {/* Animated Hero banner */}
        <Hero 
          onExploreMenu={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
          onOpenCustomizer={() => setIsCustomizerOpen(true)} 
        />

        {/* Signature Highlights Carousel */}
        <section className="py-12 bg-white border-y border-stone-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-bakery-gold block">La Signature</span>
                <h2 className="font-serif text-3xl font-black text-bakery-dark mt-1">Chef’s Daily Masterpieces</h2>
                <p className="text-xs text-stone-500 mt-1 max-w-md">Our signature products are freshly rolled and crafted at 4:00 AM daily by our master French bakers.</p>
              </div>
            </div>

            {/* Carousel horizontal list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {signatureProducts.map((prod) => (
                <motion.div
                  key={prod.id}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-3xl bg-amber-50/20 border border-amber-200/10 flex flex-col gap-3 group relative cursor-pointer"
                  onClick={() => setSelectedProduct(prod)}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-bakery-dark text-white rounded-full p-1.5 shadow">
                      <Star className="h-3 w-3 text-bakery-gold fill-bakery-gold" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-bakery-clay uppercase">{prod.category}</span>
                    <h3 className="font-serif text-base font-bold text-bakery-dark group-hover:text-bakery-gold transition-colors truncate">
                      {prod.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-mono font-bold text-sm text-stone-800">${prod.price.toFixed(2)}</span>
                      <span className="text-[10px] bg-white border border-stone-100 px-2.5 py-1 rounded-full text-stone-500 font-semibold flex items-center gap-1">
                        ★ {prod.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Interactive Cake customization Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative rounded-3xl overflow-hidden bg-bakery-dark text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-stone-800 shadow-xl">
            {/* Ambient Background glows */}
            <div className="absolute top-[-50px] left-[-50px] h-60 w-60 rounded-full bg-bakery-gold/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] right-[-50px] h-60 w-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="max-w-md space-y-4">
              <span className="text-xs font-bold text-bakery-gold uppercase tracking-widest block">Interactive Studio</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">Virtual Cake Customization Laboratory</h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Design custom tiered celebration cakes in our interactive studio! Select sponge cores, frosted textures, custom plaques, and watch it decorate live.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsCustomizerOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-bakery-gold text-white text-xs font-bold hover:bg-amber-600 transition-colors shadow-lg cursor-pointer"
              >
                <Sparkles className="h-4 w-4 animate-bounce" />
                Launch Studio Workspace
              </motion.button>
            </div>

            <div className="relative flex justify-center w-48 sm:w-60 shrink-0">
              {/* Visual customizer abstract layered representation */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-full aspect-square relative rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700/80 p-6 flex items-center justify-center shadow-inner"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-8 rounded-t bg-[#FDF6E2] border border-stone-300" />
                  <div className="w-24 h-10 rounded-t bg-[#FFFDF9] border border-stone-300 -mt-1 shadow-md" />
                  <div className="w-32 h-12 rounded-t bg-[#E8DFCC] border border-stone-300 -mt-1 shadow-lg" />
                  <div className="w-36 h-2 bg-stone-700 rounded-full mt-2" />
                </div>
                <div className="absolute top-4 right-4 bg-bakery-gold text-white rounded-full p-1.5 text-xs font-bold animate-pulse">
                  ✨
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Catalog & Menu Section */}
        <section id="catalog-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
          
          {/* Section title */}
          <div className="border-b border-stone-200/50 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="font-serif text-3xl font-black text-bakery-dark">Our Bakery Menu</h2>
              <p className="text-xs text-stone-500 mt-1">Browse and filter our exquisite daily oven batches.</p>
            </div>

            {/* Sorters */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-9 px-3 text-xs font-semibold rounded-lg border border-stone-200 focus:outline-none focus:border-bakery-gold bg-white"
              >
                <option value="popular">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Staggered Grid Catalog List */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center space-y-2">
              <span className="text-3xl">🥖</span>
              <h4 className="font-serif text-lg font-bold text-stone-700">No matching treats found</h4>
              <p className="text-xs text-stone-400">Try modifying your search or choosing another category.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={handleQuickAdd}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      {/* Trust Badges Bar */}
      <section className="bg-stone-50 border-t border-stone-200/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
              <span className="text-2xl mt-0.5">🌾</span>
              <div>
                <h4 className="font-bold text-sm text-bakery-dark">Stoneground Organic Flour</h4>
                <p className="text-xs text-stone-500 mt-0.5 leading-normal">
                  Our raw materials are strictly organic, milled on stoneground wheels to retain complete natural wheat nutrition and rich field aromas.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-2xl mt-0.5">⏰</span>
              <div>
                <h4 className="font-bold text-sm text-bakery-dark">36-Hour Sourdough Proving</h4>
                <p className="text-xs text-stone-500 mt-0.5 leading-normal">
                  No chemical yeasts. We hand-knead and rest each loaf for 36 hours of fermentation, making our breads incredibly light on the stomach.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-2xl mt-0.5">🥛</span>
              <div>
                <h4 className="font-bold text-sm text-bakery-dark">Fresh Normandy Butter</h4>
                <p className="text-xs text-stone-500 mt-0.5 leading-normal">
                  We laminate our croissant dough exclusively using dry grass-fed Normandy butter, giving our pastries an unmatched golden flakiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <footer className="bg-bakery-dark text-white border-t border-stone-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-lg font-bold tracking-tight text-white">
              Maison <span className="text-bakery-gold">Dorée</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Artisanal Boulangerie & Patisserie</p>
            <p className="text-stone-500 text-xs mt-2 font-mono">© 2026 Maison Dorée. All sweet rights reserved.</p>
          </div>

          <div className="flex gap-4 font-bold text-xs text-stone-400">
            <button onClick={() => setSelectedCategory('all')} className="hover:text-white">Our Menu</button>
            <span>•</span>
            <button onClick={() => setIsCustomizerOpen(true)} className="hover:text-white">Design Custom Cake</button>
            <span>•</span>
            <button onClick={() => setIsTrackerOpen(true)} className="hover:text-white">Order Tracker</button>
          </div>
        </div>
      </footer>

      {/* Portals and overlays */}
      
      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Cake Builder Visualizer */}
      {isCustomizerOpen && (
        <CakeCustomizer
          onClose={() => setIsCustomizerOpen(false)}
          onAddCustomCakeToCart={handleAddCustomCakeToCart}
        />
      )}

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout step pipeline */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderCompleted={handleOrderCompleted}
        />
      )}

      {/* Oven Order status tracker */}
      <OrderTracker
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        activeOrder={activeOrder}
      />
    </div>
  );
}
