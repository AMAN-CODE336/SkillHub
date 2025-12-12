import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,

  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null })
}));

export default useAuth;
