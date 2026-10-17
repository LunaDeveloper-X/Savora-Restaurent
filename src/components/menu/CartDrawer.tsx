import { useState, useEffect, type FormEvent } from 'react';
import {
  X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ArrowRight,
  CheckCircle, Truck, Store, CreditCard, Banknote, Tag, Loader2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import type { OrderType, PaymentMethod, Order } from '@/types';

type CartView = 'cart' | 'checkout' | 'confirmation';

interface CheckoutForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  orderNotes: string;
  discountCode: string;
}

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
}

const initialForm: CheckoutForm = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  orderType: 'pickup',
  deliveryAddress: '',
  paymentMethod: 'cash_on_pickup',
  orderNotes: '',
  discountCode: '',
};

export default function CartDrawer() {
  const {
    items, isOpen, closeCart, updateQuantity, removeFromCart, clearCart,
    totalItems, subtotal, deliveryFee, discountAmount, total,
    discount, applyDiscount, removeDiscount,
  } = useCart();

  const [view, setView] = useState<CartView>('cart');
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountLoading, setDiscountLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setView('cart');
      setSubmitError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (discount) setDiscountInput(discount.code);
  }, [discount]);

  const handleField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateCheckout = (): boolean => {
    const e: FormErrors = {};
    if (!form.customerName.trim()) e.customerName = 'Name is required.';
    if (!form.customerEmail.trim()) {
      e.customerEmail = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
      e.customerEmail = 'Enter a valid email.';
    }
    if (!form.customerPhone.trim()) {
      e.customerPhone = 'Phone is required.';
    } else if (form.customerPhone.replace(/[^0-9]/g, '').length < 10) {
      e.customerPhone = 'Enter a valid phone number.';
    }
    if (form.orderType === 'delivery' && !form.deliveryAddress.trim()) {
      e.deliveryAddress = 'Delivery address is required.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApplyDiscount = async () => {
    const code = discountInput.trim().toUpperCase();
    if (!code) return;
    setDiscountLoading(true);
    setDiscountError(null);
    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        setDiscountError('Invalid or expired discount code.');
        setDiscountLoading(false);
        return;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setDiscountError('This discount code has expired.');
        setDiscountLoading(false);
        return;
      }

      if (data.max_uses !== null && data.usage_count >= data.max_uses) {
        setDiscountError('This discount code has reached its usage limit.');
        setDiscountLoading(false);
        return;
      }

      if (subtotal < data.min_order_amount) {
        setDiscountError(`Minimum order of $${data.min_order_amount} required.`);
        setDiscountLoading(false);
        return;
      }

      applyDiscount({
        code: data.code,
        amount: data.discount_type === 'percentage'
          ? subtotal * (data.discount_value / 100)
          : data.discount_value,
        type: data.discount_type,
        value: data.discount_value,
      });
    } catch {
      setDiscountError('Unable to verify discount code. Please try again.');
    }
    setDiscountLoading(false);
  };

  const handleSubmitOrder = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validateCheckout()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const orderData = {
        customer_name: form.customerName,
        customer_email: form.customerEmail,
        customer_phone: form.customerPhone,
        order_type: form.orderType,
        delivery_address: form.orderType === 'delivery' ? form.deliveryAddress : null,
        payment_method: form.orderType === 'delivery' ? 'cash_on_delivery' : form.paymentMethod,
        order_notes: form.orderNotes || null,
        subtotal,
        delivery_fee: form.orderType === 'delivery' ? deliveryFee : 0,
        discount_amount: discountAmount,
        total: form.orderType === 'delivery'
          ? Math.max(0, subtotal - discountAmount + deliveryFee)
          : Math.max(0, subtotal - discountAmount),
        discount_code: discount?.code || null,
        items_json: items,
        status: 'received',
      };

      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error('No order returned from server.');

      setConfirmedOrder(data as Order);
      setView('confirmation');
      clearCart();
      removeDiscount();
      setForm(initialForm);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to submit order. Please try again.';
      setSubmitError(msg);
    }
    setSubmitting(false);
  };

  const finalTotal = form.orderType === 'delivery'
    ? Math.max(0, subtotal - discountAmount + deliveryFee)
    : Math.max(0, subtotal - discountAmount);

  const inputClass = (hasError?: string) =>
    `w-full bg-white border px-4 py-3 text-sm text-espresso-700 placeholder:text-espresso-300 focus:outline-none transition-colors ${
      hasError ? 'border-wine-500 focus:border-wine-500' : 'border-espresso-200 focus:border-amber-400'
    }`;

  const labelClass = 'block text-xs font-medium uppercase tracking-[0.12em] text-espresso-500 mb-2';

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-espresso-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeCart}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-cream-50 shadow-2xl transition-transform duration-400 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-espresso-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            {view === 'checkout' && (
              <button
                onClick={() => setView('cart')}
                className="text-espresso-400 hover:text-espresso-700 transition-colors"
                aria-label="Back to cart"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <ShoppingBag size={20} className="text-amber-600" />
            <h2 className="text-base font-serif font-medium text-espresso-800">
              {view === 'cart' && 'Your Order'}
              {view === 'checkout' && 'Checkout'}
              {view === 'confirmation' && 'Order Confirmed'}
            </h2>
            {view === 'cart' && totalItems > 0 && (
              <span className="bg-amber-500 text-espresso-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-espresso-400 hover:text-espresso-700 transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* CART VIEW */}
        {view === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag size={48} className="text-espresso-200 mb-4" />
                <p className="text-lg font-serif text-espresso-400">Your order is empty</p>
                <p className="mt-2 text-sm text-espresso-300">
                  Browse our menu and add your favorite dishes to get started.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] bg-espresso-800 text-cream-50 hover:bg-espresso-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {items.map((ci) => (
                    <div key={ci.id} className="flex gap-3 bg-white p-3 shadow-sm">
                      <img src={ci.image} alt={ci.name} className="w-16 h-16 object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-serif font-medium text-espresso-800 leading-snug">
                          {ci.name}
                        </h3>
                        {ci.selectedOptions.length > 0 && (
                          <p className="mt-0.5 text-xs text-espresso-400 truncate">
                            {ci.selectedOptions.map((o) => o.optionLabel).join(', ')}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-espresso-200">
                            <button
                              onClick={() => updateQuantity(ci.id, ci.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-espresso-500 hover:bg-espresso-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs font-medium text-espresso-700">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(ci.id, ci.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-espresso-500 hover:bg-espresso-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-serif text-amber-600">
                            ${ci.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(ci.id)}
                        className="self-start text-espresso-300 hover:text-wine-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={clearCart}
                    className="w-full py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-wine-600 hover:text-wine-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Footer */}
                <div className="border-t border-espresso-200 px-5 py-4 bg-white flex-shrink-0">
                  {/* Discount code input */}
                  <div className="mb-4">
                    {discount ? (
                      <div className="flex items-center justify-between bg-sage-50 px-3 py-2.5 border border-sage-200">
                        <div className="flex items-center gap-2">
                          <Tag size={14} className="text-sage-600" />
                          <span className="text-xs font-medium text-sage-700">{discount.code}</span>
                          <span className="text-xs text-sage-500">
                            (-${discountAmount.toFixed(2)})
                          </span>
                        </div>
                        <button
                          onClick={() => { removeDiscount(); setDiscountInput(''); }}
                          className="text-xs text-wine-600 hover:text-wine-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountInput}
                          onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                          placeholder="Discount code"
                          className="flex-1 border border-espresso-200 px-3 py-2 text-xs text-espresso-700 placeholder:text-espresso-300 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                        <button
                          onClick={handleApplyDiscount}
                          disabled={discountLoading || !discountInput.trim()}
                          className="px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] bg-espresso-800 text-cream-50 hover:bg-espresso-900 transition-colors disabled:opacity-50"
                        >
                          {discountLoading ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                        </button>
                      </div>
                    )}
                    {discountError && (
                      <p className="mt-1.5 text-xs text-wine-500">{discountError}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-sm text-espresso-500">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-sage-600">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-espresso-500">
                      <span>Delivery Fee</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-medium text-espresso-800 pt-1.5 border-t border-espresso-100">
                      <span>Total</span>
                      <span>${(subtotal - discountAmount).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={closeCart}
                      className="flex-1 py-3 border border-espresso-200 text-espresso-600 font-medium text-xs uppercase tracking-[0.12em] hover:border-amber-400 hover:text-amber-600 transition-colors"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => setView('checkout')}
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-espresso-900 font-medium text-xs uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-1.5"
                    >
                      Checkout <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* CHECKOUT VIEW */}
        {view === 'checkout' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {submitError && (
                <div className="bg-wine-50 border border-wine-200 px-4 py-3 text-sm text-wine-700">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="cName" className={labelClass}>Full Name</label>
                <input id="cName" type="text" value={form.customerName}
                  onChange={(e) => handleField('customerName', e.target.value)}
                  placeholder="Jane Doe" className={inputClass(errors.customerName)} />
                {errors.customerName && <p className="mt-1 text-xs text-wine-500">{errors.customerName}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cEmail" className={labelClass}>Email</label>
                  <input id="cEmail" type="email" value={form.customerEmail}
                    onChange={(e) => handleField('customerEmail', e.target.value)}
                    placeholder="jane@email.com" className={inputClass(errors.customerEmail)} />
                  {errors.customerEmail && <p className="mt-1 text-xs text-wine-500">{errors.customerEmail}</p>}
                </div>
                <div>
                  <label htmlFor="cPhone" className={labelClass}>Phone</label>
                  <input id="cPhone" type="tel" value={form.customerPhone}
                    onChange={(e) => handleField('customerPhone', e.target.value)}
                    placeholder="(212) 555-0184" className={inputClass(errors.customerPhone)} />
                  {errors.customerPhone && <p className="mt-1 text-xs text-wine-500">{errors.customerPhone}</p>}
                </div>
              </div>

              <div>
                <p className={labelClass}>Order Type</p>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleField('orderType', 'pickup')}
                    className={`flex items-center gap-2 px-4 py-3 border text-sm transition-all ${
                      form.orderType === 'pickup' ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-espresso-200 text-espresso-500 hover:border-amber-300'}`}>
                    <Store size={16} /> Pickup
                  </button>
                  <button type="button" onClick={() => handleField('orderType', 'delivery')}
                    className={`flex items-center gap-2 px-4 py-3 border text-sm transition-all ${
                      form.orderType === 'delivery' ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-espresso-200 text-espresso-500 hover:border-amber-300'}`}>
                    <Truck size={16} /> Delivery
                  </button>
                </div>
              </div>

              {form.orderType === 'delivery' && (
                <div>
                  <label htmlFor="cAddr" className={labelClass}>Delivery Address</label>
                  <textarea id="cAddr" value={form.deliveryAddress}
                    onChange={(e) => handleField('deliveryAddress', e.target.value)}
                    placeholder="Street address, city, ZIP code" rows={2}
                    className={inputClass(errors.deliveryAddress)} />
                  {errors.deliveryAddress && <p className="mt-1 text-xs text-wine-500">{errors.deliveryAddress}</p>}
                </div>
              )}

              {form.orderType === 'pickup' && (
                <div>
                  <p className={labelClass}>Payment Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => handleField('paymentMethod', 'cash_on_pickup')}
                      className={`flex items-center gap-2 px-4 py-3 border text-sm transition-all ${
                        form.paymentMethod === 'cash_on_pickup' ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-espresso-200 text-espresso-500 hover:border-amber-300'}`}>
                      <Banknote size={16} /> Cash on Pickup
                    </button>
                    <button type="button" disabled
                      className="flex items-center gap-2 px-4 py-3 border text-sm border-espresso-100 text-espresso-300 cursor-not-allowed">
                      <CreditCard size={16} /> Online (Soon)
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="cNotes" className={labelClass}>
                  Order Notes <span className="text-espresso-300 normal-case">(optional)</span>
                </label>
                <textarea id="cNotes" value={form.orderNotes}
                  onChange={(e) => handleField('orderNotes', e.target.value)}
                  placeholder="Special instructions, allergies, etc." rows={2}
                  className={inputClass(undefined)} />
              </div>

              {/* Order summary */}
              <div className="bg-espresso-50 p-4 space-y-2">
                <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-espresso-600 mb-3">Order Summary</h3>
                {items.map((ci) => (
                  <div key={ci.id} className="flex justify-between text-xs text-espresso-500">
                    <span className="truncate flex-1 pr-2">{ci.quantity}× {ci.name}</span>
                    <span className="flex-shrink-0">${ci.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-espresso-200 space-y-1.5">
                  <div className="flex justify-between text-sm text-espresso-500">
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-sage-600">
                      <span>Discount ({discount?.code})</span><span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {form.orderType === 'delivery' && (
                    <div className="flex justify-between text-sm text-espresso-500">
                      <span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-serif font-medium text-espresso-800 pt-1.5 border-t border-espresso-200">
                    <span>Total</span><span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-espresso-200 px-5 py-4 bg-white flex-shrink-0">
              <button type="submit" disabled={submitting}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-espresso-900 font-medium text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Placing Order...</>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        )}

        {/* CONFIRMATION VIEW */}
        {view === 'confirmation' && confirmedOrder && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center overflow-y-auto py-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-sage-100 rounded-full">
              <CheckCircle size={32} className="text-sage-500" />
            </div>
            <h3 className="text-xl font-serif font-light text-espresso-800 mb-2">
              Order Placed Successfully!
            </h3>
            <p className="text-sm text-espresso-400 mb-6">
              Thank you, {confirmedOrder.customer_name}. Your order has been received.
            </p>

            <div className="bg-white p-6 w-full text-left shadow-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-espresso-400">Reference</span>
                <span className="font-serif font-medium text-espresso-800">
                  {confirmedOrder.reference_number}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-espresso-400">Type</span>
                <span className="text-espresso-600 capitalize">{confirmedOrder.order_type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-espresso-400">Status</span>
                <span className="text-amber-600 capitalize">{confirmedOrder.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-espresso-400">Total</span>
                <span className="font-serif font-medium text-espresso-800">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-espresso-400">Payment</span>
                <span className="text-espresso-600 capitalize">
                  {confirmedOrder.payment_method === 'cash_on_delivery' ? 'Cash on Delivery' : 'Cash on Pickup'}
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs text-espresso-300 text-center">
              Save your reference number to track your order status. A confirmation has been sent to{' '}
              {confirmedOrder.customer_email}.
            </p>

            <button onClick={closeCart}
              className="mt-6 px-8 py-3 text-xs font-medium uppercase tracking-[0.12em] bg-espresso-800 text-cream-50 hover:bg-espresso-900 transition-colors">
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );
}
