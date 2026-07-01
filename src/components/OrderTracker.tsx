/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Flame, Award, ShoppingBag, Layers, Box, Compass, RefreshCw } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: Order | null;
}

export default function OrderTracker({ isOpen, onClose, activeOrder }: OrderTrackerProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(activeOrder);

  // Sync state from local storage or parent
  const syncOrders = () => {
    const list = JSON.parse(localStorage.getItem('maison_orders') || '[]');
    setOrders(list);
    if (!selectedOrder && list.length > 0) {
      setSelectedOrder(list[0]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      syncOrders();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeOrder) {
      setSelectedOrder(activeOrder);
    }
  }, [activeOrder]);

  const advanceOrderStatus = (orderId: string) => {
    const statuses: Order['status'][] = ['received', 'baking', 'decorating', 'ready', 'completed'];
    const list = JSON.parse(localStorage.getItem('maison_orders') || '[]');
    const updated = list.map((ord: Order) => {
      if (ord.id === orderId) {
        const idx = statuses.indexOf(ord.status);
        const nextStatus = idx < statuses.length - 1 ? statuses[idx + 1] : statuses[0];
        return { ...ord, status: nextStatus };
      }
      return ord;
    });

    localStorage.setItem('maison_orders', JSON.stringify(updated));
    setOrders(updated);
    
    // update current selection
    const newlyUpdated = updated.find((o: Order) => o.id === orderId);
    if (newlyUpdated) {
      setSelectedOrder(newlyUpdated);
    }
  };

  if (!isOpen) return null;

  const statuses = [
    { id: 'received', label: 'Order Received', desc: 'Ticket printed & ingredients prepped', icon: '📝' },
    { id: 'baking', label: 'Baking in Oven', desc: 'Rising beautifully in 240°C brick ovens', icon: '🔥' },
    { id: 'decorating', label: 'Fine Decorating', desc: 'Swiss meringue frosting & garnishing', icon: '✨' },
    { id: 'ready', label: 'Ready for Dispatch', desc: 'Packaged in warm, eco-certified paper boxes', icon: '📦' },
    { id: 'completed', label: 'Delivered / Completed', desc: 'Enjoy your warm artisanal treats!', icon: '💝' }
  ];

  const currentStatusIndex = selectedOrder 
    ? statuses.findIndex(s => s.id === selectedOrder.status) 
    : 0;

  return (
    <AnimatePresence>
      <div id="tracker-overlay-container" className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Sheet panel */}
        <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="w-screen max-w-lg bg-white shadow-2xl border-l border-stone-100 flex flex-col justify-between h-full"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-bakery-dark">Maison Order Tracker</h3>
                <p className="text-[10px] uppercase tracking-widest text-bakery-clay font-bold -mt-0.5">Live Oven Progress Feed</p>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full border border-stone-100 bg-stone-50 hover:bg-white text-stone-500 hover:text-bakery-gold flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              
              {/* Order selector sidebar simulation if there are multiple orders */}
              {orders.length > 1 && (
                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 block">Select Order Receipt</span>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {orders.map((ord) => (
                      <button
                        key={ord.id}
                        onClick={() => setSelectedOrder(ord)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border shrink-0 transition-all ${
                          selectedOrder?.id === ord.id
                            ? 'border-bakery-gold bg-amber-50/40 text-bakery-gold'
                            : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200'
                        }`}
                      >
                        {ord.id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Core visual status */}
              {!selectedOrder ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-3">
                  <span className="text-4xl">🗒️</span>
                  <h4 className="font-serif text-base font-bold text-stone-700">No active orders found</h4>
                  <p className="text-xs text-stone-400 max-w-xs">
                    Place an order first to experience our live simulated oven tracking timeline!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Order Meta details panel */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] bg-bakery-gold/10 text-bakery-gold font-bold px-2 py-0.5 rounded-full uppercase">
                          {selectedOrder.deliveryType}
                        </span>
                        <h4 className="font-serif text-base font-black text-bakery-dark mt-1">Receipt: {selectedOrder.id}</h4>
                        <p className="text-[10px] text-stone-400">Placed at {selectedOrder.timestamp} today</p>
                      </div>
                      
                      {/* FAST FORWARD SIMULATOR TRICK */}
                      <button
                        onClick={() => advanceOrderStatus(selectedOrder.id)}
                        className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-bold shadow-xs transition-colors"
                        title="Simulate Bakery Progress Step"
                      >
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        Oven Boost 🪄
                      </button>
                    </div>

                    {/* Summary items */}
                    <div className="border-t border-stone-200/50 mt-3 pt-2">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Delights Baking</p>
                      <ul className="space-y-1">
                        {selectedOrder.items.map((item) => (
                          <li key={item.id} className="text-xs text-stone-600 flex justify-between">
                            <span>
                              {item.quantity}x {item.product?.name || 'Maison Custom Stack'} 
                              {item.size && <span className="text-[9px] text-bakery-gold font-bold ml-1">({item.size})</span>}
                            </span>
                            <span className="font-mono text-stone-500">${((item.product?.price || item.customCake?.price || 0) * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Vertical Progress Steps */}
                  <div className="relative pl-8 space-y-6 pt-2">
                    
                    {/* Visual Vertical line */}
                    <div className="absolute left-3.5 top-5 bottom-5 w-0.5 bg-stone-100" />

                    {statuses.map((step, idx) => {
                      const isCompleted = idx < currentStatusIndex;
                      const isActive = idx === currentStatusIndex;
                      const isUpcoming = idx > currentStatusIndex;

                      return (
                        <div key={step.id} className="relative flex gap-4">
                          
                          {/* Circle marker on line */}
                          <div className="absolute -left-8 top-1.5 flex h-7.5 w-7.5 items-center justify-center rounded-full border bg-white z-10 transition-colors duration-300">
                            {isCompleted ? (
                              <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</div>
                            ) : isActive ? (
                              <motion.div 
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="h-5.5 w-5.5 rounded-full bg-bakery-gold flex items-center justify-center text-white font-bold text-[10px]"
                              >
                                {step.icon}
                              </motion.div>
                            ) : (
                              <span className="text-xs opacity-40">{step.icon}</span>
                            )}
                          </div>

                          {/* Text instructions */}
                          <div className={`transition-opacity duration-300 ${isUpcoming ? 'opacity-40' : 'opacity-100'}`}>
                            <h5 className={`text-xs font-bold leading-tight ${
                              isActive ? 'text-bakery-gold text-sm' : 'text-bakery-dark'
                            }`}>
                              {step.label}
                            </h5>
                            <p className="text-[10px] text-stone-500 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info banner */}
            <div className="px-6 py-6 bg-stone-50 border-t border-stone-100">
              <div className="rounded-2xl border border-dashed border-stone-200 p-3.5 text-center text-[10px] text-stone-400 leading-normal">
                🥖 <span className="font-semibold text-stone-500">Maison Pro Tip:</span> Use the <span className="font-bold text-bakery-gold">Oven Boost 🪄</span> tool in the header card above to simulate your oven states from raw mix up to complete dispatch and delivery!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
