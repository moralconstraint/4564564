import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './auth';

interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  activeSubscriptions: number;
  lastUpdated: Date;
}

interface AdminState {
  users: User[];
  stats: AdminStats;
  activities: Array<{
    id: string;
    type: 'user' | 'order' | 'support' | 'system';
    message: string;
    timestamp: Date;
    userId?: string;
  }>;
  addActivity: (activity: Omit<AdminState['activities'][0], 'id'>) => void;
  updateStats: (newStats: Partial<AdminStats>) => void;
  resetStats: () => void;
  resetActivities: () => void;
  resetAll: () => void;
}

const defaultStats: AdminStats = {
  totalUsers: 0,
  totalRevenue: 0,
  totalOrders: 0,
  activeSubscriptions: 0,
  lastUpdated: new Date(),
};

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      users: [],
      stats: defaultStats,
      activities: [],

      addActivity: (activity) => set((state) => ({
        activities: [
          {
            id: Math.random().toString(36).substring(7),
            ...activity,
            timestamp: new Date(),
          },
          ...state.activities,
        ].slice(0, 100), // Keep only last 100 activities
      })),

      updateStats: (newStats) => set((state) => ({
        stats: {
          ...state.stats,
          ...newStats,
          lastUpdated: new Date(),
        },
      })),

      resetStats: () => set((state) => ({
        stats: defaultStats,
        activities: [
          {
            id: Math.random().toString(36).substring(7),
            type: 'system',
            message: 'Stats have been reset',
            timestamp: new Date(),
          },
          ...state.activities,
        ],
      })),

      resetActivities: () => set((state) => ({
        activities: [
          {
            id: Math.random().toString(36).substring(7),
            type: 'system',
            message: 'Activity log has been cleared',
            timestamp: new Date(),
          },
        ],
      })),

      resetAll: () => set(() => ({
        users: [],
        stats: defaultStats,
        activities: [
          {
            id: Math.random().toString(36).substring(7),
            type: 'system',
            message: 'All admin data has been reset',
            timestamp: new Date(),
          },
        ],
      })),
    }),
    {
      name: 'admin-storage',
      version: 1,
    }
  )
);