import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, MenuItem } from '@/types';

interface DiscountInfo {
  code: string;
  amount: number;
  type: 'percentage' | 'fixed';
  value: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: { groupTitle: string; optionLabel: string; priceModifier: number }[]
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  discount: DiscountInfo | null;
  applyDiscount: (info: DiscountInfo) => void;
  removeDiscount: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'savora-cart';
const DISCOUNT_KEY = 'savora-discount';
const DELIVERY_FEE = 5.0;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState<DiscountInfo | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
      const storedDiscount = localStorage.getItem(DISCOUNT_KEY);
      if (storedDiscount) setDiscount(JSON.parse(storedDiscount));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      if (discount) {
        localStorage.setItem(DISCOUNT_KEY, JSON.stringify(discount));
      } else {
        localStorage.removeItem(DISCOUNT_KEY);
      }
    } catch {
      // ignore
    }
  }, [discount]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    (
      item: MenuItem,
      quantity: number,
      selectedOptions: { groupTitle: string; optionLabel: string; priceModifier: number }[]
    ) => {
      const modifiersTotal = selectedOptions.reduce((sum, o) => sum + o.priceModifier, 0);
      const unitPrice = item.price + modifiersTotal;
      const cartId = `${item.id}-${selectedOptions.map((o) => o.optionLabel).join('-') || 'base'}`;

      setItems((prev) => {
        const existing = prev.find((ci) => ci.id === cartId);
        if (existing) {
          return prev.map((ci) =>
            ci.id === cartId
              ? {
                  ...ci,
                  quantity: ci.quantity + quantity,
                  totalPrice: (ci.quantity + quantity) * ci.unitPrice,
                }
              : ci
          );
        }
        const newItem: CartItem = {
          id: cartId,
          menuItemId: item.id,
          name: item.name,
          image: item.image,
          basePrice: item.price,
          quantity,
          selectedOptions,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      });
      setIsOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((ci) => ci.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((ci) =>
        ci.id === id ? { ...ci, quantity, totalPrice: ci.unitPrice * quantity } : ci
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(null);
  }, []);

  const applyDiscount = useCallback((info: DiscountInfo) => setDiscount(info), []);
  const removeDiscount = useCallback(() => setDiscount(null), []);

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = items.reduce((sum, ci) => sum + ci.totalPrice, 0);
  const discountAmount = discount
    ? discount.type === 'percentage'
      ? Math.min(subtotal * (discount.value / 100), subtotal)
      : Math.min(discount.value, subtotal)
    : 0;
  const deliveryFee = DELIVERY_FEE;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        discountAmount,
        total,
        discount,
        applyDiscount,
        removeDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
