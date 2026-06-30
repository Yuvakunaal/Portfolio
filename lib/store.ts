import { create } from "zustand";

interface PortfolioStore {
  introDone: boolean;
  setIntroDone: (done: boolean) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  introDone: true,
  setIntroDone: (done) => set({ introDone: done }),
}));
