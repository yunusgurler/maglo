import { create } from "zustand";

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (u: AuthState["user"]) => void;
  setTokens: (t: {
    accessToken: string | null;
    refreshToken: string | null;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("maglo_access") || null,
  refreshToken: localStorage.getItem("maglo_refresh") || null,
  setUser: (user) => set({ user }),
  setTokens: ({ accessToken, refreshToken }) => {
    if (accessToken) localStorage.setItem("maglo_access", accessToken);
    if (refreshToken) localStorage.setItem("maglo_refresh", refreshToken);
    set({ accessToken, refreshToken });
  },
  logout: () => {
    localStorage.removeItem("maglo_access");
    localStorage.removeItem("maglo_refresh");
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));
