import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("tasks-token"),
  setToken: (token) => {
    localStorage.setItem("tasks-token", token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("tasks-token");
    set({ token: null });
  },
}));

export default useAuthStore;