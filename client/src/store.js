import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: { uid: null, email: null, profileName: null },
  setUser: (user) => {
    set({ user });
  },
}));
