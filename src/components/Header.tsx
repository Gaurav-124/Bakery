/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, ClipboardList, Utensils, Sparkles, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenCustomizer: () => void;
  onSearch: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Header({
  cart,
  onOpenCart,
  onOpenTracker,
  onOpenCustomizer,
  onSearch,
  selectedCategory,
  setSelectedCategory
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const categories = [
    { id: 'all', label: 'All Delights' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'pastries', label: 'Pastries' },
    { id: 'breads', label: 'Breads' },
    { id: 'cookies', label: 'Cookies & Sweet' }
  ];

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b border-stone-100 bg-bakery-cream/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bakery-gold text-white shadow-sm">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-bakery-dark">
                Maison <span className="text-bakery-gold">Dorée</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-bakery-clay font-medium -mt-1">Artisanal Boulangerie</p>
            </div>
          </motion.div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  selectedCategory === category.id 
                    ? 'text-bakery-gold font-semibold' 
                    : 'text-stone-600 hover:text-bakery-dark hover:bg-stone-50'
                }`}
              >
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-stone-100/70 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {category.label}
              </button>
            ))}
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Bar Toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search treats..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="h-10 rounded-full border border-stone-200 bg-white pl-4 pr-10 text-sm focus:border-bakery-gold focus:outline-none"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 bg-white/50 text-stone-600 hover:bg-white hover:text-bakery-gold transition-colors"
                title="Search menu"
              >
                {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </button>
            </div>

            {/* Cake Customizer Shortcut */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCustomizer}
              className="hidden lg:flex items-center gap-1.5 px-4 h-10 rounded-full bg-amber-50 border border-amber-200/50 text-amber-800 text-xs font-semibold shadow-sm hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-bakery-gold animate-pulse" />
              Design Custom Cake
            </motion.button>

            {/* Order Tracker Button */}
            <button
              onClick={onOpenTracker}
              className="flex h-10 w-10 sm:w-auto sm:px-3.5 items-center justify-center gap-1.5 rounded-full border border-stone-100 bg-white/50 text-stone-600 hover:bg-white hover:text-bakery-gold transition-colors"
              title="Track Orders"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-medium">Track Order</span>
            </button>

            {/* Shopping Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bakery-dark text-white shadow-md hover:bg-stone-800 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-bakery-gold text-[10px] font-bold text-white shadow"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 md:hidden items-center justify-center rounded-full border border-stone-100 bg-white/50 text-stone-600 hover:bg-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-stone-100 bg-bakery-cream px-4 py-4 space-y-2"
          >
            <p className="text-xs uppercase tracking-wider text-bakery-clay font-bold px-3">Filter Delights</p>
            <div className="grid grid-cols-2 gap-2 pb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 text-xs text-left font-medium rounded-xl transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-bakery-gold text-white font-bold shadow-sm' 
                      : 'bg-white text-stone-600 border border-stone-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="border-t border-stone-100 pt-3">
              <button
                onClick={() => {
                  onOpenCustomizer();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-xs"
              >
                <Sparkles className="h-4 w-4 text-bakery-gold animate-bounce" />
                Custom Cake Visual Studio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
