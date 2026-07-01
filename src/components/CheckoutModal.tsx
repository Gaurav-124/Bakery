/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Truck, Store, CreditCard, Sparkles } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  cart: CartItem[];
  onClose: () => void;
  onOrderCompleted: (order: Order) => void;
}

export default function CheckoutModal({ cart, onClose, onOrderCompleted }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  
  // Card Details State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Processing Animation State
  const [processingState, setProcessingState] = useState(0);

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product ? item.product.price : (item.customCake ? item.customCake.price : 0);
    return sum + (price * item.quantity);
  }, 0);

  const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !phone || (deliveryType === 'delivery' && !address)) {
        alert('Please fill out all required details.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVV)) {
        alert('Please fill out card details.');
        return;
      }
      triggerOrderPlacement();
    }
  };

  const triggerOrderPlacement = () => {
    setStep(3);
    const textStates = [
      '🥣 Kneading organic sourdough starter...',
      '🧈 Layering premium European butter...',
      '🔥 Pre-heating artisanal brick ovens...',
      '💖 Sprinkling organic garnishes & love...',
      '✨ Order finalized & locked in!'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setProcessingState(current);
      if (current >= textStates.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          finalizeOrder();
        }, 800);
      }
    }, 1000);
  };

  const finalizeOrder = () => {
    const orderId = `MDS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? address : 'Maison Dorée Shop (Pickup)',
      paymentMethod,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      status: 'received',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Save to local storage for tracking
    const existingOrders = JSON.parse(localStorage.getItem('maison_orders') || '[]');
    localStorage.setItem('maison_orders', JSON.stringify([newOrder, ...existingOrders]));

    onOrderCompleted(newOrder);
  };

  return (
    <AnimatePresence>
      <div id="checkout-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Main container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="px-6 py-5 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-bakery-dark">Maison Order Checkout</h3>
              <p className="text-[10px] uppercase tracking-widest text-bakery-clay font-bold -mt-0.5">Step {step} of 3</p>
            </div>
            {step < 3 && (
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full border border-stone-100 bg-white hover:bg-stone-50 text-stone-500 hover:text-bakery-gold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Stepped Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block mb-2">Delivery Method</span>
                
                {/* Method Toggles */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      deliveryType === 'pickup'
                        ? 'border-bakery-gold bg-amber-50/50 text-bakery-gold font-extrabold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    Bakery Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      deliveryType === 'delivery'
                        ? 'border-bakery-gold bg-amber-50/50 text-bakery-gold font-extrabold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    Home Delivery
                  </button>
                </div>

                <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block pt-2">Contact Details</span>
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gabriel Blanc"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. gabriel@boulangerie.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50"
                  />
                </div>

                {/* Delivery Address (only if Home Delivery) */}
                {deliveryType === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1"
                  >
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Delivery Address</label>
                    <textarea
                      required
                      placeholder="e.g. Apartment 4B, 128 Maplewood Avenue, NY"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full py-2.5 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50 min-h-[60px]"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <span className="text-xs font-black uppercase tracking-wider text-bakery-dark block mb-2">Payment Method</span>
                
                {/* Method selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      paymentMethod === 'card'
                        ? 'border-bakery-gold bg-amber-50/50 text-bakery-gold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-bakery-gold bg-amber-50/50 text-bakery-gold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    💵 Pay on Delivery/Pickup
                  </button>
                </div>

                {/* Card input details */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    {/* Visual Card Mock */}
                    <div className="w-full aspect-[16/10] sm:h-44 bg-gradient-to-br from-stone-800 via-stone-900 to-bakery-dark rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden select-none border border-stone-700">
                      <div className="absolute top-[-20px] right-[-20px] h-36 w-36 rounded-full bg-bakery-gold/10 blur-2xl" />
                      
                      <div className="flex justify-between items-start">
                        <span className="font-serif italic text-xs tracking-wider text-stone-300">Maison Premium Card</span>
                        <div className="h-6 w-9 bg-white/20 rounded-md flex items-center justify-center text-[10px] font-bold">VISA</div>
                      </div>

                      {/* Chip */}
                      <div className="h-7 w-9 bg-amber-200/80 rounded-md border border-amber-300 shadow-inner" />

                      {/* Card Number display */}
                      <span className="font-mono text-base tracking-widest block text-stone-200 my-2">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </span>

                      <div className="flex justify-between items-end text-[10px]">
                        <div>
                          <span className="text-[8px] text-stone-400 block uppercase">Cardholder</span>
                          <span className="font-bold tracking-wide uppercase truncate max-w-[150px] block">{name || 'GUEST CUSTOMER'}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-stone-400 block uppercase text-right">Expires</span>
                          <span className="font-mono font-bold block text-right">{cardExpiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={(e) => {
                            // auto space formatting
                            let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                            let matches = val.match(/\d{4,16}/g);
                            let match = matches && matches[0] || '';
                            let parts = [];
                            for (let i=0, len=match.length; i<len; i+=4) {
                              parts.push(match.substring(i, i+4));
                            }
                            if (parts.length > 0) {
                              setCardNumber(parts.join(' '));
                            } else {
                              setCardNumber(val);
                            }
                          }}
                          className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-500 uppercase">Expiration</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              if (val.length > 2) {
                                setCardExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                              } else {
                                setCardExpiry(val);
                              }
                            }}
                            className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50 font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-500 uppercase">CVV Security</label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            placeholder="***"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-11 px-4 text-xs rounded-xl border border-stone-100 focus:outline-none focus:border-bakery-gold bg-stone-50/50 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Placing Order Pipeline */}
            {step === 3 && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                
                {/* Simulated Bakery Kneading animation */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="h-20 w-20 rounded-full border-4 border-dashed border-bakery-gold"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">🧑‍🍳</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-bakery-dark">Maison Baker is preparing...</h4>
                  
                  {/* Moving status text */}
                  <motion.p 
                    key={processingState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-semibold text-bakery-clay"
                  >
                    {[
                      '🥣 Kneading organic flour...',
                      '🧈 Layering premium European butter...',
                      '🔥 Pre-heating artisanal brick ovens...',
                      '💖 Sprinkling organic garnishes & love...',
                      '✨ Order finalized & locked in!'
                    ][processingState] || 'Securing order receipt...'}
                  </motion.p>
                </div>

                {/* Progress bar dots */}
                <div className="flex gap-1.5 justify-center">
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <div 
                      key={dot} 
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        processingState >= dot ? 'bg-bakery-gold' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stepped Footer pricing summary */}
          {step < 3 && (
            <div className="px-6 py-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[9px] text-stone-400 block uppercase font-bold tracking-wider">Subtotal Due</span>
                <span className="font-mono text-base font-black text-bakery-dark">
                  ${total.toFixed(2)}
                </span>
                {deliveryFee > 0 && <span className="text-[9px] text-stone-400 block -mt-0.5">(Includes $5 delivery fee)</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStep}
                className="px-6 h-11 rounded-full bg-bakery-dark text-white hover:bg-stone-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {step === 1 ? 'Go to Payment' : 'Finalize & Place Order'}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
