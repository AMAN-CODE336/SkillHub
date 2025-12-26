import { create } from "zustand";

const storedUser = localStorage.getItem("user");

const useAuth = create((set) => ({
  // restore user on app load
  user: storedUser ? JSON.parse(storedUser) : null,

  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null });
  }
}));

export default useAuth;
