import { create } from "zustand";

interface PortfolioStore {
  introDone: boolean;
  setIntroDone: (done: boolean) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  introDone: false,
  setIntroDone: (done) => set({ introDone: done }),
}));
