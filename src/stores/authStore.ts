import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';

interface AuthStoreState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
