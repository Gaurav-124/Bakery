/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, Check, ShoppingBag, Info, Heart, ArrowRight } from 'lucide-react';
import { CustomCake } from '../types';

interface CakeCustomizerProps {
  onClose: () => void;
  onAddCustomCakeToCart: (cake: CustomCake) => void;
}

const FLAVORS = [
  { id: 'vanilla', name: 'Madagascar Vanilla Bean', color: '#FDF6E2', price: 25.00, desc: 'Classic, moist vanilla bean sponge with organic seeds' },
  { id: 'chocolate', name: 'Double Belgian Chocolate', color: '#4E2C1E', price: 28.00, desc: 'Rich Valrhona cocoa cake with chocolate chunk melts' },
  { id: 'velvet', name: 'Midnight Red Velvet', color: '#801815', price: 30.00, desc: 'Lush, mildly cocoa cake with bright traditional buttermilk notes' },
  { id: 'matcha', name: 'Uji Matcha Green Tea', color: '#6A8054', price: 32.00, desc: 'Earthy organic green tea cake layered with subtle sweetness' }
];

const FROSTINGS = [
  { id: 'buttercream', name: 'Classic Smooth Buttercream', color: '#FFFDF9', style: 'border-b-4 border-stone-200/20' },
  { id: 'naked', name: 'Rustic Semi-Naked', color: '#E8DFCC', style: 'opacity-85 border-r-4 border-amber-900/10' },
  { id: 'waves', name: 'Textured Whimsical Waves', color: '#FFFAED', style: 'bg-gradient-to-r from-white/30 to-amber-100/10' }
];

const TOPPINGS = [
  { id: 'berries', name: 'Fresh Alpine Berries', icon: '🍓', price: 4.50 },
  { id: 'gold', name: '24K Edible Gold Flakes', icon: '✨', price: 8.00 },
  { id: 'curls', name: 'Dark Chocolate Curls', icon: '🍫', price: 3.50 },
  { id: 'macarons', name: 'Mini French Macarons', icon: '🧁', price: 6.00 }
];

export default function CakeCustomizer({ onClose, onAddCustomCakeToCart }: CakeCustomizerProps) {
  const [tiers, setTiers] = useState<1 | 2 | 3>(1);
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const baseTierPrice = { 1: 15, 2: 30, 3: 45 };

  const calculateToppingPrice = () => {
    return selectedToppings.reduce((sum, id) => {
      const topping = TOPPINGS.find(t => t.id === id);
      return sum + (topping ? topping.price : 0);
    }, 0);
  };

  const calculatedPrice = 
    selectedFlavor.price + 
    baseTierPrice[tiers] + 
    calculateToppingPrice();

  const toggleTopping = (id: string) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter(item => item !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  const handleAddCustomCake = () => {
    const id = `custom_${Date.now()}`;
    const customCake: CustomCake = {
      id,
      tiers,
      baseFlavor: selectedFlavor.name,
      frosting: selectedFrosting.name,
      toppings: selectedToppings.map(id => TOPPINGS.find(t => t.id === id)?.name || ''),
      message: customMessage,
      price: calculatedPrice
    };

    onAddCustomCakeToCart(customCake);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div id="cake-customizer-root" className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      {/* Dynamic Main Workspace Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-stone-100 max-h-[95vh] lg:max-h-[85vh]"
      >
        
        {/* Header Ribbon for Mobile */}
        <div className="lg:hidden px-6 py-4 bg-bakery-cream border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-bakery-dark">Visual Cake Studio</h2>
            <p className="text-[10px] uppercase tracking-widest text-bakery-clay font-bold -mt-0.5">Design Your Masterpiece</p>
          </div>
          <button 
            onClick={onClose} 
            className="h-8 w-8 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-600 font-bold"
          >
            ✕
          </button>
        </div>

        {/* LEFT: Live Stack Renderer Canvas */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-stone-50 via-bakery-cream/30 to-amber-50/10 p-6 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-stone-100 min-h-[300px] sm:min-h-[400px]">
          
          {/* Exit for Desktop */}
          <button 
            onClick={onClose}
            className="hidden lg:flex absolute top-6 left-6 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-600 border border-stone-100 shadow hover:text-bakery-gold transition-colors z-20 cursor-pointer"
          >
            ✕
          </button>

          {/* Canvas Header info */}
          <div className="hidden lg:block text-left pt-2">
            <span className="text-[10px] font-bold text-bakery-gold uppercase tracking-wider block">Maison Dorée</span>
            <h2 className="font-serif text-2xl font-black text-bakery-dark">Interactive Visual Studio</h2>
            <p className="text-xs text-stone-500">Live 2D layered simulation of your signature custom pastry.</p>
          </div>

          {/* Visual Canvas containing stacked cake divs */}
          <div className="flex-1 flex flex-col items-center justify-end pb-8 relative mt-4">
            
            {/* Ambient glows and highlights */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-radial-gradient from-bakery-gold/5 to-transparent blur-xl pointer-events-none" />

            {/* Cake Pedestal Stand */}
            <div className="w-64 h-4 bg-stone-100 border border-stone-200/60 rounded-full shadow-md z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-8 bg-stone-200/80 rounded-b-xl border-x border-b border-stone-300 -mb-8 shadow" />
            </div>

            {/* Render Stacked Cake Layers */}
            <div className="w-full flex flex-col items-center justify-end mb-4 z-10 relative">
              
              {/* Toppings Container (float on Top Layer) */}
              <div className="h-8 flex justify-center items-end gap-1.5 mb-1 select-none pointer-events-none">
                {selectedToppings.map((tid) => {
                  const top = TOPPINGS.find(t => t.id === tid);
                  return (
                    <motion.span 
                      key={tid}
                      initial={{ opacity: 0, y: -20, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 10 }}
                      className="text-2xl filter drop-shadow-sm"
                    >
                      {top?.icon}
                    </motion.span>
                  );
                })}
              </div>

              {/* TIER 3 (Top - Small) */}
              {tiers >= 3 && (
                <motion.div
                  initial={{ scale: 0, y: -40 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: -40 }}
                  style={{ backgroundColor: selectedFrosting.color }}
                  className={`w-28 h-12 rounded-t-xl shadow-md border border-stone-200/40 relative flex items-center justify-center overflow-hidden ${selectedFrosting.style}`}
                >
                  {/* Inside Flavor Ring */}
                  <div 
                    style={{ backgroundColor: selectedFlavor.color }} 
                    className="absolute inset-x-4 h-3 bottom-0 border-t border-stone-200/30 opacity-90"
                  />
                </motion.div>
              )}

              {/* TIER 2 (Middle - Medium) */}
              {tiers >= 2 && (
                <motion.div
                  initial={{ scale: 0, y: -30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: -30 }}
                  style={{ backgroundColor: selectedFrosting.color }}
                  className={`w-36 h-14 rounded-t-xl shadow-md border border-stone-200/40 relative flex items-center justify-center overflow-hidden -mt-1.5 ${selectedFrosting.style}`}
                >
                  <div 
                    style={{ backgroundColor: selectedFlavor.color }} 
                    className="absolute inset-x-5 h-3.5 bottom-0 border-t border-stone-200/30 opacity-90"
                  />
                </motion.div>
              )}

              {/* TIER 1 (Bottom - Large) */}
              <motion.div
                layout
                style={{ backgroundColor: selectedFrosting.color }}
                className={`w-44 h-16 rounded-t-xl shadow-lg border border-stone-200/40 relative flex items-center justify-center overflow-hidden -mt-1.5 ${selectedFrosting.style}`}
              >
                {/* Flavor Core Layer representation */}
                <div 
                  style={{ backgroundColor: selectedFlavor.color }} 
                  className="absolute inset-x-6 h-4 bottom-0 border-t border-stone-200/30 opacity-90"
                />

                {/* Animated icing writing on the bottom tier */}
                {customMessage && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    className="absolute inset-x-2 bottom-6 text-[10px] text-center italic text-stone-700 font-serif truncate font-bold uppercase tracking-widest pointer-events-none select-none"
                    style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.7)' }}
                  >
                    "{customMessage}"
                  </motion.span>
                )}
              </motion.div>
            </div>
          </div>

          {/* Summary status tag */}
          <div className="p-4 rounded-2xl bg-white border border-stone-100 flex items-center justify-between text-xs font-semibold">
            <div className="flex gap-1 items-center text-stone-500">
              <Info className="h-4 w-4 text-bakery-gold" />
              <span>Base: {selectedFlavor.name}</span>
            </div>
            <span className="font-mono text-stone-800 font-bold">{tiers} Tier{tiers > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* RIGHT: Designer Controls Dashboard */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-none">
          <div className="space-y-6">
            
            {/* Step 1: Tier Selection */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-bakery-dark">1. Stack Structure</span>
                <span className="text-[10px] font-bold text-bakery-clay bg-amber-50 px-2 py-0.5 rounded-full">+$15 per tier</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {([1, 2, 3] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTiers(t)}
                    className={`h-11 rounded-xl text-xs font-extrabold flex items-center justify-center transition-all ${
                      tiers === t
                        ? 'bg-bakery-dark text-white border-2 border-bakery-dark'
                        : 'border border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {t === 1 ? 'Single Tier' : t === 2 ? 'Double Tier' : 'Triple Stack'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor Core Selection */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block mb-2">2. Sponge Core Flavor</span>
              <div className="grid grid-cols-2 gap-2">
                {FLAVORS.map((flavor) => (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-3 rounded-xl border text-left flex gap-2.5 items-start transition-all ${
                      selectedFlavor.id === flavor.id
                        ? 'border-bakery-gold bg-amber-50/40 shadow-sm'
                        : 'border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    {/* Circle representing color */}
                    <div 
                      className="h-4 w-4 rounded-full border border-stone-200 shrink-0 mt-0.5" 
                      style={{ backgroundColor: flavor.color }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-bakery-dark">{flavor.name}</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-tight line-clamp-1">{flavor.desc}</p>
                      <span className="text-[10px] font-mono font-bold text-bakery-gold mt-1 block">+${flavor.price.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Frosting Styles */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block mb-2">3. Icing / Frosting Texture</span>
              <div className="grid grid-cols-3 gap-2">
                {FROSTINGS.map((frost) => (
                  <button
                    key={frost.id}
                    type="button"
                    onClick={() => setSelectedFrosting(frost)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedFrosting.id === frost.id
                        ? 'border-bakery-gold bg-amber-50/40 font-bold'
                        : 'border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs text-bakery-dark block truncate">{frost.name.split(' ').slice(1).join(' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Toppings Selection */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block mb-2">4. Top Decor & Garnish</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.includes(topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                        isSelected
                          ? 'border-bakery-gold bg-amber-50/50'
                          : 'border-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xl mb-1">{topping.icon}</span>
                      <span className="text-[10px] font-bold text-stone-700 leading-tight block truncate w-full">{topping.name.split(' ').slice(1).join(' ')}</span>
                      <span className="text-[9px] font-mono font-semibold text-bakery-gold mt-1 block">+${topping.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Custom Plaque Lettering */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block">5. Edible Script Plaque</span>
                <span className="text-[9px] text-stone-400">Optional • Max 20 chars</span>
              </div>
              <input
                type="text"
                maxLength={20}
                placeholder="e.g. HBD MOM, 100% Edible Icing"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/30"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 border-t border-stone-100 pt-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase font-bold tracking-wider">Total Design Estimate</span>
              <span className="font-mono text-2xl font-black text-bakery-dark">
                ${calculatedPrice.toFixed(2)}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddCustomCake}
              disabled={isSuccess}
              className={`flex-1 h-12 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isSuccess 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-bakery-dark text-white hover:bg-stone-800'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="h-4 w-4 animate-bounce" />
                  Cake Spec Added to Order Bag!
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add Custom Masterpiece
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
