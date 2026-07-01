/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Wheat, Trophy } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomizer: () => void;
}

export default function Hero({ onExploreMenu, onOpenCustomizer }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-bakery-cream to-white py-12 lg:py-20">
      
      {/* Decorative background vectors */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-amber-50/60 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-50/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Hero Text */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1.5 border border-amber-200/40 text-amber-900"
            >
              <Trophy className="h-4 w-4 text-bakery-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider">Voted Best Local Bakery 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-bakery-dark"
            >
              Artisanal <span className="italic text-bakery-gold font-normal">perfection</span> baked daily.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              Indulge in our slow-fermented organic sourdoughs, buttery pastries laminated to perfection, and luxurious customized celebration cakes crafted with natural ingredients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-6 py-3.5 bg-bakery-dark text-white rounded-full font-semibold text-sm hover:bg-stone-800 transition-colors shadow-lg cursor-pointer"
              >
                Explore Delights
                <ArrowRight className="h-4 w-4 text-bakery-gold" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCustomizer}
                className="flex items-center gap-2 px-6 py-3.5 bg-white border border-stone-200 text-bakery-dark rounded-full font-semibold text-sm hover:border-bakery-gold transition-colors shadow-sm cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-bakery-gold" />
                Custom Cake Designer
              </motion.button>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-100"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-bakery-gold">
                  <Wheat className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-bakery-dark">Organic Flour</h4>
                  <p className="text-[11px] text-stone-500">100% Stoneground</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm text-bakery-dark">36h Proof</h4>
                <p className="text-[11px] text-stone-500">Traditional Ferment</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-bakery-dark">0% Preservatives</h4>
                <p className="text-[11px] text-stone-500">Pure Butter & Joy</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Banner Showcase Frame */}
          <div className="lg:col-span-7 flex justify-center relative">
            
            {/* Visual Frame Overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-bakery-gold/10 to-transparent rounded-3xl" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl aspect-[16/10] bg-stone-100"
            >
              <img
                src={HERO_IMAGE}
                alt="Maison Dorée Artisanal Bakery Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
              
              {/* Float badge inside image */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 border border-stone-100 shadow-lg"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50">
                  <span className="text-xl font-serif">🥐</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-bakery-dark">Fresh Batch Out Now</h5>
                  <p className="text-[10px] text-stone-500">Almond Croissants</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative mini pastry cards behind or next to it */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl bg-white border border-stone-100 p-3 shadow-xl max-w-xs"
            >
              <img 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=150" 
                alt="Golden croissants" 
                referrerPolicy="no-referrer"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <span className="text-[10px] font-bold text-bakery-gold uppercase tracking-wider">Flaky & Warm</span>
                <h5 className="text-xs font-bold text-bakery-dark">Normandy Croissant</h5>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
