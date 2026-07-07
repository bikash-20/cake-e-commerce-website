import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DELIVERY_FEE_INSIDE,
  DELIVERY_FEE_OUTSIDE,
  findCake,
  type AddOn,
} from '../data/cakes';

export type CartItem = {
  /** unique line id — includes cake id + weight + selected add-on ids */
  lineId: string;
  cakeId: string;
  weight: string;
  /** ids of selected add-ons (matches AddOn.id from the cake definition) */
  addOnIds: string[];
  quantity: number;
};

export type DeliveryLocation = 'inside' | 'outside';

type CartState = {
  items: CartItem[];
  note: string;
  delivery: DeliveryLocation;
};

type CartContextValue = {
  items: CartItem[];
  note: string;
  delivery: DeliveryLocation;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (params: Omit<CartItem, 'lineId' | 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  setNote: (note: string) => void;
  setDelivery: (loc: DeliveryLocation) => void;
  clearCart: () => void;
};

const STORAGE_KEY = 'sugar-and-sylhet-cart-v1';

const CartContext = createContext<CartContextValue | null>(null);

const lineIdFor = (cakeId: string, weight: string, addOnIds: string[]) =>
  `${cakeId}::${weight}::${addOnIds.slice().sort().join('+')}`;

function loadInitial(): CartState {
  if (typeof window === 'undefined') return { items: [], note: '', delivery: 'inside' };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], note: '', delivery: 'inside' };
    const parsed = JSON.parse(raw) as Partial<CartState>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      note: typeof parsed.note === 'string' ? parsed.note : '',
      delivery: parsed.delivery === 'outside' ? 'outside' : 'inside',
    };
  } catch {
    return { items: [], note: '', delivery: 'inside' };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(loadInitial);
  const [isOpen, setIsOpen] = useState(false);

  // Persist to localStorage on any state change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem: CartContextValue['addItem'] = useCallback(({ cakeId, weight, addOnIds, quantity = 1 }) => {
    setState((prev) => {
      const newLineId = lineIdFor(cakeId, weight, addOnIds);
      const existing = prev.items.find((i) => i.lineId === newLineId);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.lineId === newLineId ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        };
      }
      return {
        ...prev,
        items: [...prev.items, { lineId: newLineId, cakeId, weight, addOnIds, quantity }],
      };
    });
    setIsOpen(true);
  }, []);

  const updateQuantity: CartContextValue['updateQuantity'] = useCallback((lineId, quantity) => {
    setState((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    }));
  }, []);

  const removeItem: CartContextValue['removeItem'] = useCallback((lineId) => {
    setState((prev) => ({ ...prev, items: prev.items.filter((i) => i.lineId !== lineId) }));
  }, []);

  const setNote: CartContextValue['setNote'] = useCallback((note) => {
    setState((prev) => ({ ...prev, note }));
  }, []);

  const setDelivery: CartContextValue['setDelivery'] = useCallback((loc) => {
    setState((prev) => ({ ...prev, delivery: loc }));
  }, []);

  const clearCart = useCallback(() => {
    setState({ items: [], note: '', delivery: 'inside' });
  }, []);

  // Derived totals -----------------------------------------------------------
  const itemCount = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(() => {
    return state.items.reduce((acc, item) => {
      const cake = findCake(item.cakeId);
      if (!cake) return acc;
      const w = cake.weights.find((wt) => wt.weight === item.weight);
      if (!w) return acc;
      const addOnTotal = (item.addOnIds || []).reduce((s, id) => {
        const addon = cake.addons?.find((a: AddOn) => a.id === id);
        return s + (addon?.price ?? 0);
      }, 0);
      return acc + (w.price + addOnTotal) * item.quantity;
    }, 0);
  }, [state.items]);

  const deliveryFee = state.delivery === 'inside' ? DELIVERY_FEE_INSIDE : DELIVERY_FEE_OUTSIDE;
  const total = subtotal + (itemCount > 0 ? deliveryFee : 0);

  const value: CartContextValue = {
    items: state.items,
    note: state.note,
    delivery: state.delivery,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    updateQuantity,
    removeItem,
    setNote,
    setDelivery,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}