import type { UserResponseDTO } from '@/api/auth/dto';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: UserResponseDTO | null;
  access_token: string | null;
  isAuthenticated: boolean;
  setToken: (accessToken: string) => void;
  logout: () => void;
  setUser: (user: UserResponseDTO | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      access_token: null,
      setToken: (access_token) => set({ isAuthenticated: true, access_token }),
      logout: () =>
        set({ user: null, isAuthenticated: false, access_token: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth_store',
    }
  )
);
