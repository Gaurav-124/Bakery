/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, Cake, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => {
    const price = item.product ? item.product.price : (item.customCake ? item.customCake.price : 0);
    return sum + (price * item.quantity);
  }, 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Drawer Slide-in Container */}
        <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="w-screen max-w-md bg-white shadow-2xl border-l border-stone-100 flex flex-col justify-between h-full"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-bakery-gold" />
                <span className="font-serif text-lg font-bold text-bakery-dark">Your Order Bag</span>
                <span className="text-[10px] bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full border border-stone-100 bg-stone-50 hover:bg-white text-stone-500 hover:text-bakery-gold flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart Contents List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 pb-12">
                  <span className="text-4xl">🥯</span>
                  <h3 className="font-serif text-lg font-bold text-stone-700">Your bag is empty</h3>
                  <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                    Fresh breads, warm flaky pastries, and decadent signature cakes await you. Add some sweet treats to get started!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 text-xs font-bold text-bakery-gold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item) => {
                    const isCustomCake = !!item.customCake;
                    const price = item.product ? item.product.price : (item.customCake ? item.customCake.price : 0);
                    const name = item.product ? item.product.name : 'Maison Custom Masterpiece';
                    const image = item.product ? item.product.image : '';

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        exit={{ opacity: 0, x: 50, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 p-4 rounded-2xl bg-stone-50/50 border border-stone-100/80 group"
                      >
                        {/* Item Photo */}
                        <div className="h-16 w-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/40">
                          {isCustomCake ? (
                            <div className="w-full h-full bg-amber-50 flex items-center justify-center text-bakery-gold">
                              <Cake className="h-7 w-7 animate-pulse" />
                            </div>
                          ) : (
                            <img
                              src={image}
                              alt={name}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-black text-bakery-dark truncate leading-tight pr-4">
                                {name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-600 transition-opacity p-0.5 shrink-0"
                                title="Remove item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Standard Cake details (Size & custom wording) */}
                            {!isCustomCake && item.product?.category === 'cakes' && (
                              <div className="mt-1 flex flex-col gap-0.5 text-[9px] text-stone-500">
                                <span className="font-bold text-bakery-gold uppercase tracking-wider">{item.size} Edition</span>
                                {item.writing && (
                                  <span className="italic text-stone-600 font-medium">Inscription: "{item.writing}"</span>
                                )}
                              </div>
                            )}

                            {/* Custom Cake Specifications details */}
                            {isCustomCake && item.customCake && (
                              <div className="mt-1 flex flex-col gap-0.5 text-[9px] text-stone-500">
                                <span className="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md w-max inline-flex items-center gap-1">
                                  <Sparkles className="h-2.5 w-2.5 text-bakery-gold" />
                                  Custom {item.customCake.tiers}-Tier Cake
                                </span>
                                <span className="leading-tight">Flavor: {item.customCake.baseFlavor}</span>
                                <span className="leading-tight">Icing: {item.customCake.frosting}</span>
                                {item.customCake.toppings.length > 0 && (
                                  <span className="leading-tight truncate">Toppings: {item.customCake.toppings.join(', ')}</span>
                                )}
                                {item.customCake.message && (
                                  <span className="italic font-bold text-stone-600 mt-0.5">"Message: {item.customCake.message}"</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Footer Action and Pricing */}
                          <div className="flex items-center justify-between mt-2.5">
                            <span className="font-mono text-xs font-black text-stone-800">
                              ${(price * item.quantity).toFixed(2)}
                            </span>

                            {/* Quantity buttons */}
                            <div className="flex items-center border border-stone-200 rounded-full h-8 px-1.5 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-5 text-stone-400 hover:text-bakery-dark font-extrabold text-xs text-center"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-[11px] font-mono font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-5 text-stone-400 hover:text-bakery-dark font-extrabold text-xs text-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary Info */}
            {cart.length > 0 && (
              <div className="px-6 py-6 bg-stone-50 border-t border-stone-100 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-500 font-semibold">
                    <span>Item Subtotal</span>
                    <span className="font-mono text-stone-700">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500 font-semibold">
                    <span>Baking & Pack Prep</span>
                    <span className="text-emerald-600 font-medium font-mono">FREE</span>
                  </div>
                  <div className="border-t border-stone-200 my-2 pt-2 flex justify-between items-center">
                    <span className="font-serif text-sm font-black text-bakery-dark">Order Subtotal</span>
                    <span className="font-mono text-lg font-black text-bakery-dark">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenCheckout}
                  className="w-full h-12 rounded-full bg-bakery-dark text-white hover:bg-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Proceed to Bake Checkout
                  <ArrowRight className="h-4 w-4 text-bakery-gold" />
                </motion.button>

                <p className="text-[10px] text-stone-400 text-center leading-normal">
                  All items are prepared under hygiene guidelines and baked freshly before scheduled dispatch slots.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
