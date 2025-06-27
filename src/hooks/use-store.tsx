import { create } from "zustand";
import { Store, StoreData } from "@/lib/routes/types";

export const useStore = create<{
  store: Store;
  setStore: (data: StoreData) => void;
}>((set) => ({
  store: {
    initialized: false,
    data: {
      areas: new Map(),
      sectors: new Map(),
      routes: new Map(),
      ascents: new Map(),
    },
  },
  setStore: (data: StoreData) =>
    set({ store: { data: data, initialized: true } }),
}));
