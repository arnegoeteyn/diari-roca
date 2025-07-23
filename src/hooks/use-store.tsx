import { create } from "zustand";
import {
  Ascent,
  ID,
  Pre,
  Route,
  Store,
  StoreData,
  Trip,
} from "@/lib/routes/types";
import { addRoute, putRoute } from "@/lib/routes/routes";
import { addAscent } from "@/lib/routes/ascents";
import { addTrip } from "@/lib/routes/trips";

export const useRoutesStore = create<{
  store: Store;
  setStore: (data: StoreData) => void;
  addRoute: (route: Pre<Route>) => Promise<ID>;
  putRoute: (route: Route) => Promise<void>;
  addAscent: (ascent: Pre<Ascent>) => Promise<void>;
  addTrip: (trip: Pre<Trip>) => Promise<ID>;
}>((set) => ({
  store: {
    initialized: false,
    data: {
      areas: new Map(),
      sectors: new Map(),
      routes: new Map(),
      ascents: new Map(),
      trips: new Map(),
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
  addRoute: async (route: Pre<Route>) => {
    const newRouteId = await addRoute(route);
    set((state) => {
      const updatedRoutes = new Map(state.store.data.routes);
      updatedRoutes.set(newRouteId, { ...route, id: newRouteId });
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, routes: updatedRoutes },
        },
      };
    });
    return newRouteId;
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
  addTrip: async (trip: Pre<Trip>) => {
    const newTripId = await addTrip(trip);
    set((state) => {
      const updatedTrips = new Map(state.store.data.trips);
      updatedTrips.set(newTripId, { ...trip, id: newTripId });
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, trips: updatedTrips },
        },
      };
    });
    return newTripId;
  },
}));
