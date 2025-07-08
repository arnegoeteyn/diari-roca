import { create } from "zustand";
import { Ascent, Pre, Route, Store, StoreData } from "@/lib/routes/types";
import { putRoute } from "@/lib/routes/routes";
import { addAscent } from "@/lib/routes/ascents";

export const useRoutesStore = create<{
  store: Store;
  setStore: (data: StoreData) => void;
  putRoute: (route: Route) => Promise<void>;
  addAscent: (ascent: Pre<Ascent>) => Promise<void>;
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
  addAscent: async (ascent: Pre<Ascent>) => {
    const newAscentId = await addAscent(ascent);
    set((state) => {
      const updatedAscents = new Map(state.store.data.ascents);
      updatedAscents.set(newAscentId, { ...ascent, id: newAscentId });
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, ascents: updatedAscents },
        },
      };
    });
  },
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
