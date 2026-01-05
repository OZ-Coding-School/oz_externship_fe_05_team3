import type { Auth, Author } from '@/types/index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: Author) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth',
    }
  )
);
export default useAuthStore;
