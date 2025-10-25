import { create } from "zustand";
import {
  Ascent,
  ID,
  Pre,
  putAscent,
  Route,
  Store,
  StoreData,
  Trip,
} from "@/lib/routes";
import {
  deleteAscent as cacheDeleteAscent,
  storeAscent as cacheStoreAscent,
} from "@/lib/cache";
import { addRoute, putRoute } from "@/lib/routes/routes";
import { addAscent, deleteAscent } from "@/lib/routes";
import { addTrip } from "@/lib/routes/trips";
import { addArea, addSector, Area, putArea, Sector } from "@/lib/routes";
import { clear } from "@/lib/routes/db";

// This should be the only data accessing hook in the whole folder
export const useRoutesStore = create<{
  store: Store;
  clear: () => Promise<void>;
  setStore: (data: StoreData) => void;
  addArea: (area: Pre<Area>) => Promise<ID>;
  putArea: (area: Area) => Promise<void>;
  addRoute: (route: Pre<Route>) => Promise<ID>;
  addSector: (sector: Pre<Sector>) => Promise<ID>;
  putRoute: (route: Route) => Promise<void>;
  addAscent: (ascent: Pre<Ascent>) => Promise<void>;
  putAscent: (ascent: Ascent) => Promise<void>;
  deleteAscent: (ascentId: ID) => Promise<void>;
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
  clear: async () => {
    await clear();
    set((state) => {
      return {
        store: {
          ...state.store,
          initialized: false,
          data: {} as StoreData,
        },
      };
    });
  },
  setStore: (data: StoreData) =>
    set({ store: { data: data, initialized: true } }),
  addAscent: async (ascent: Pre<Ascent>) => {
    const newAscentId = await addAscent(ascent);
    set((state) => {
      const updatedStoreData = cacheStoreAscent(
        state.store.data,
        newAscentId,
        ascent,
      );
      return {
        store: {
          ...state.store,
          data: updatedStoreData,
        },
      };
    });
  },
  putAscent: async (ascent: Ascent) => {
    set((state) => {
      const updatedAscents = new Map(state.store.data.ascents);
      updatedAscents.set(ascent.id, ascent);
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, ascents: updatedAscents },
        },
      };
    });
    return putAscent(ascent);
  },
  deleteAscent: async (ascentId: ID) => {
    await deleteAscent(ascentId);
    set((state) => {
      const updatedStoreData = cacheDeleteAscent(state.store.data, ascentId);
      return {
        store: {
          ...state.store,
          data: updatedStoreData,
        },
      };
    });
  },
  addSector: async (sector: Pre<Sector>) => {
    const newSectorId = await addSector(sector);
    set((state) => {
      const updatedSectors = new Map(state.store.data.sectors);
      updatedSectors.set(newSectorId, { ...sector, id: newSectorId });
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, sectors: updatedSectors },
        },
      };
    });
    return newSectorId;
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
  addArea: async (area: Pre<Area>) => {
    const newAreaId = await addArea(area);
    set((state) => {
      const updatedAreas = new Map(state.store.data.areas);
      updatedAreas.set(newAreaId, { ...area, id: newAreaId });
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, areas: updatedAreas },
        },
      };
    });
    return newAreaId;
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
  putArea: async (area: Area) => {
    set((state) => {
      const updatedAreas = new Map(state.store.data.areas);
      updatedAreas.set(area.id, area);
      return {
        store: {
          ...state.store,
          data: { ...state.store.data, areas: updatedAreas },
        },
      };
    });
    return putArea(area);
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
