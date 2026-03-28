import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  pfpUrl?: string;
  bio?: string;
  emailVerified: boolean;
  isProfileActive: boolean;
  activeProfile: 'personal' | 'professional';
  chipStatus: 'unverified' | 'verified' | 'activated';
  scannedChipId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      initializeAuth: async () => {
        try {
          const token = await SecureStore.getItemAsync('jwt_token');
          if (token && get().user) {
             set({ token, isAuthenticated: true });
          } else {
             set({ token: null, isAuthenticated: false });
          }
        } catch (e) {
          set({ token: null, isAuthenticated: false });
        }
      },
      setAuth: async (user, token) => {
        await SecureStore.setItemAsync('jwt_token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: async () => {
        // Clear memory state instantly to guarantee UI re-renders, regardless of SecureStore
        set({ user: null, token: null, isAuthenticated: false });
        try {
          await SecureStore.deleteItemAsync('jwt_token');
        } catch (e) {
          console.warn('Silent SecureStore wipe error on logout:', e);
        }
      },
      updateUser: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }), // only persist user, not the token (token is in secure store)
    }
  )
);
