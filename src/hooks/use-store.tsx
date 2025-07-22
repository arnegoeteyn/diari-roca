import { create } from "zustand";
import { Route, Store, StoreData } from "@/lib/routes/types";
import { putRoute } from "@/lib/routes/routes";

export const useRoutesStore = create<{
  store: Store;
  setStore: (data: StoreData) => void;
  putRoute: (route: Route) => Promise<void>;
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
  putRoute: async (route: Route) => {
    set((state) => {
      const updatedRoutes = new Map(state.store.data.routes);
      updatedRoutes.set(route.id, route);
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, routes: updatedRoutes },
        },
      };
    });
    return putRoute(route);
  },
}));
