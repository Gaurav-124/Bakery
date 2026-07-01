/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Clock, AlertCircle, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-white transition-all hover:shadow-xl"
    >
      
      {/* Signature Overlay Tag */}
      {product.isSignature && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-bakery-dark/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          <Star className="h-3 w-3 text-bakery-gold fill-bakery-gold" />
          Signature
        </div>
      )}

      {/* Allergens Warn Preview */}
      {product.allergens && product.allergens.length > 0 && (
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          {product.allergens.map((allergen) => (
            <span 
              key={allergen} 
              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-700 border border-red-100 text-[9px] font-bold"
              title={`Contains ${allergen}`}
            >
              {allergen[0]}
            </span>
          ))}
        </div>
      )}

      {/* Product Image Frame */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square w-full overflow-hidden bg-stone-100 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Category & Details Bar */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-bakery-clay uppercase tracking-widest mb-1.5">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-stone-500 font-medium normal-case">
            <Clock className="h-3.5 w-3.5 text-stone-400" />
            {product.prepTime}
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="font-serif text-lg font-extrabold text-bakery-dark hover:text-bakery-gold transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Rating Row */}
        <div className="mt-3 flex items-center gap-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-stone-600">{product.rating}</span>
          <span className="text-[10px] text-stone-400">({product.reviewsCount})</span>
        </div>

        {/* Footer Pricing & Button */}
        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
          <div>
            <span className="text-[10px] text-stone-400 block uppercase font-bold tracking-wider">Price</span>
            <span className="font-mono text-lg font-black text-bakery-dark">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-bakery-dark text-white rounded-full text-xs font-semibold hover:bg-bakery-gold transition-colors shadow shadow-stone-200 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
