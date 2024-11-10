import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number;
  tier?: 'basic' | 'vip' | 'gold';
  duration?: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product & { tier?: string; duration?: number }) => void;
  removeItem: (productId: string, tier?: string, duration?: number) => void;
  updateQuantity: (productId: string, quantity: number, tier?: string, duration?: number) => void;
  clearCart: () => void;
}

const calculateItemPrice = (item: CartItem): number => {
  let price = item.price;
  
  // Apply tier pricing if applicable
  if (item.tier && item.tiers) {
    price = item.tiers[item.tier].price;
  }

  // Apply duration multiplier and discount if applicable
  if (item.duration && item.durations) {
    const durationOption = item.durations.find(d => d.months === item.duration);
    if (durationOption) {
      // Apply duration discount
      price = price * (1 - durationOption.discount);
      // Multiply by number of months
      price = price * item.duration;
    }
  }

  return price;
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemPrice = calculateItemPrice(item);
    return total + itemPrice * item.quantity;
  }, 0);
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => 
          item.id === product.id && 
          item.tier === product.tier && 
          item.duration === product.duration
        );

        let newItems;
        if (existingItem) {
          newItems = currentItems.map((item) =>
            item.id === product.id &&
            item.tier === product.tier &&
            item.duration === product.duration
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...currentItems, { ...product, quantity: 1 }];
        }

        set({ items: newItems, total: calculateTotal(newItems) });
      },

      removeItem: (productId, tier, duration) => {
        const newItems = get().items.filter((item) => 
          !(item.id === productId && 
            item.tier === tier && 
            item.duration === duration)
        );
        set({ items: newItems, total: calculateTotal(newItems) });
      },

      updateQuantity: (productId, quantity, tier, duration) => {
        if (quantity <= 0) {
          get().removeItem(productId, tier, duration);
          return;
        }

        const newItems = get().items.map((item) =>
          item.id === productId && 
          item.tier === tier && 
          item.duration === duration
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems, total: calculateTotal(newItems) });
      },

      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 1) {
          return {
            items: [],
            total: 0
          };
        }
        return persistedState as CartState;
      },
    }
  )
);