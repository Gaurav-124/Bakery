/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Clock, AlertCircle, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: '6 inch' | '8 inch' | '10 inch', writing?: string, quantity?: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<'6 inch' | '8 inch' | '10 inch'>('6 inch');
  const [customWriting, setCustomWriting] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isCake = product.category === 'cakes';

  const sizePriceAdjustment = {
    '6 inch': 0,
    '8 inch': 12,
    '10 inch': 25
  };

  const calculatedUnitPrice = product.price + (isCake ? sizePriceAdjustment[selectedSize] : 0);
  const calculatedTotalPrice = calculatedUnitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, isCake ? selectedSize : undefined, isCake ? customWriting : undefined, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div id="product-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-stone-100 flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-700 hover:bg-white hover:text-bakery-gold shadow border border-stone-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left: Product Image */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[500px] relative bg-stone-50">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.isSignature && (
              <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 rounded-full bg-bakery-dark px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                <Star className="h-3.5 w-3.5 text-bakery-gold fill-bakery-gold" />
                Maison Signature
              </div>
            )}
          </div>

          {/* Right: Detailed Configuration */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-none md:h-[500px]">
            <div>
              {/* Header category info */}
              <div className="flex items-center gap-2 text-xs font-bold text-bakery-gold uppercase tracking-wider">
                <span>{product.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-normal text-stone-500 normal-case">
                  <Clock className="h-3.5 w-3.5 text-stone-400" />
                  Prep time: {product.prepTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-extrabold text-bakery-dark">
                {product.name}
              </h2>

              {/* Rating Summary */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-700">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewsCount} reviews)</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Interactive Sizing Block (Cakes Only) */}
              {isCake && (
                <div className="mt-5 space-y-2">
                  <label className="text-xs font-bold text-bakery-dark uppercase tracking-wider block">
                    Choose Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['6 inch', '8 inch', '10 inch'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                          selectedSize === size
                            ? 'border-bakery-gold bg-amber-50/50 text-bakery-gold'
                            : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div>{size === '6 inch' ? '6"' : size === '8 inch' ? '8"' : '10"'} Size</div>
                        <div className="text-[9px] text-stone-500 font-normal mt-0.5">
                          {size === '6 inch' ? 'Feeds 6-8' : size === '8 inch' ? 'Feeds 12-16' : 'Feeds 20-25'}
                        </div>
                        {sizePriceAdjustment[size] > 0 && (
                          <div className="text-[10px] text-bakery-gold font-mono mt-1">
                            (+${sizePriceAdjustment[size]})
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Lettering Message Block (Cakes Only) */}
              {isCake && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-bakery-dark uppercase tracking-wider block">
                      Custom Cake Message
                    </label>
                    <span className="text-[10px] text-stone-400">Optional • Max 30 chars</span>
                  </div>
                  <input
                    type="text"
                    maxLength={30}
                    value={customWriting}
                    onChange={(e) => setCustomWriting(e.target.value)}
                    placeholder="e.g. Happy Birthday Chloe!"
                    className="w-full h-11 px-4 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-bakery-gold bg-stone-50/50"
                  />
                </div>
              )}

              {/* Allergens Details Block */}
              {product.allergens && product.allergens.length > 0 && (
                <div className="mt-5 p-3 rounded-2xl bg-amber-50/30 border border-amber-200/20 flex gap-2.5 items-start">
                  <AlertCircle className="h-4 w-4 text-bakery-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-bakery-clay uppercase tracking-wider block">Allergen Information</span>
                    <p className="text-[11px] text-stone-600">
                      Contains: <span className="font-semibold text-bakery-dark">{product.allergens.join(', ')}</span>. Baked in a facility that handles nuts, dairy, gluten, and eggs.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-6 border-t border-stone-100 pt-4 flex items-center justify-between gap-4">
              
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-200 rounded-full h-11 px-2.5 bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 text-stone-500 hover:text-bakery-dark font-extrabold text-lg text-center"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold font-mono">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 text-stone-500 hover:text-bakery-dark font-extrabold text-lg text-center"
                >
                  +
                </button>
              </div>

              {/* Purchase button with dynamic price */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 h-11 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isAdded 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-bakery-dark text-white hover:bg-stone-800'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 animate-bounce" />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add • ${calculatedTotalPrice.toFixed(2)}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
