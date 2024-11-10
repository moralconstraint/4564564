import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAdmin } from '@/lib/admin';
import { Product } from '@/types/product';

export interface Transaction {
  id: string;
  productId: string;
  date: Date;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  key?: string;
  type: 'unlock' | 'software';
}

// Function to generate a license key
const generateLicenseKey = () => {
  const segments = 4;
  const segmentLength = 4;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segmentLength; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < segments - 1) key += '-';
  }
  
  return key;
};

// Calculate the total price for a product with tier and duration
const calculateProductPrice = (product: Product & { tier?: string; duration?: number }): number => {
  let price = product.price;
  
  // Apply tier pricing if applicable
  if (product.tier && product.tiers) {
    price = product.tiers[product.tier].price;
  }

  // Apply duration multiplier and discount if applicable
  if (product.duration && product.durations) {
    const durationOption = product.durations.find(d => d.months === product.duration);
    if (durationOption) {
      // Apply duration discount
      price = price * (1 - durationOption.discount);
      // Multiply by number of months
      price = price * product.duration;
    }
  }

  return price;
};

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (product: Product & { tier?: string; duration?: number }) => Transaction;
  getTransactions: () => Transaction[];
}

export const useTransactions = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],
      
      addTransaction: (product) => {
        // Calculate the actual total price
        const totalPrice = calculateProductPrice(product);

        const transaction: Transaction = {
          id: `TX-${Date.now().toString(36).toUpperCase()}`,
          productId: product.id,
          date: new Date(),
          amount: totalPrice,
          status: 'completed',
          description: product.name,
          key: product.category === 'software' ? generateLicenseKey() : undefined,
          type: product.category,
        };

        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));

        // Update admin stats
        const { updateStats } = useAdmin.getState();
        updateStats({
          totalRevenue: (get().transactions.reduce((sum, t) => sum + t.amount, 0) + totalPrice),
          totalOrders: get().transactions.length + 1,
        });

        return transaction;
      },

      getTransactions: () => {
        return get().transactions;
      },
    }),
    {
      name: 'transactions-storage',
      version: 1,
    }
  )
);