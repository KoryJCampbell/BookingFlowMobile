import { create } from "zustand";
import type { User } from "@/types/user";
import * as authService from "@/services/auth.service";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authService.login(email, password);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error("Login failed");
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
