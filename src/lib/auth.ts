import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAdmin } from '@/lib/admin';

interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  theme?: 'dark' | 'light' | 'system';
  notifications?: {
    email: boolean;
    updates: boolean;
    marketing: boolean;
  };
  language?: string;
  twoFactor?: boolean;
  role?: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateSettings: (settings: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // For demo purposes, make the first user an admin
        const isFirstUser = !get().user;
        
        set({
          user: {
            id: '1',
            email,
            username: email.split('@')[0],
            theme: 'dark',
            notifications: {
              email: true,
              updates: true,
              marketing: false,
            },
            language: 'en',
            twoFactor: false,
            role: isFirstUser ? 'admin' : 'user',
          },
          isAuthenticated: true,
        });

        // Add user activity to admin panel
        const { addActivity } = useAdmin.getState();
        addActivity({
          type: 'user',
          action: 'User Sign In',
          details: `User ${email} signed in`,
          userEmail: email,
        });
      },

      signUp: async (email: string, username: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // For demo purposes, make the first user an admin
        const isFirstUser = !get().user;
        
        set({
          user: {
            id: '1',
            email,
            username,
            theme: 'dark',
            notifications: {
              email: true,
              updates: true,
              marketing: false,
            },
            language: 'en',
            twoFactor: false,
            role: isFirstUser ? 'admin' : 'user',
          },
          isAuthenticated: true,
        });

        // Add user activity to admin panel
        const { addActivity } = useAdmin.getState();
        addActivity({
          type: 'user',
          action: 'New User Registration',
          details: `User ${email} created an account`,
          userEmail: email,
        });
      },

      signOut: () => {
        const { addActivity } = useAdmin.getState();
        const currentUser = get().user;
        
        if (currentUser) {
          addActivity({
            type: 'user',
            action: 'User Sign Out',
            details: `User ${currentUser.email} signed out`,
            userEmail: currentUser.email,
          });
        }

        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (data: Partial<User>) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...data,
            },
          });
        }
      },

      updateSettings: async (settings: Partial<User>) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...settings,
            },
          });
        }
      },

      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);