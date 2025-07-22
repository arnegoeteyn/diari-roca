import { Area, Ascent, ID, Pre, Route, Sector } from "./types";
import {
  DBSchema,
  IDBPDatabase,
  IDBPTransaction,
  openDB,
  StoreNames,
} from "idb";

interface RoutesDB extends DBSchema {
  routes: {
    key: ID;
    value: Pre<Route>;
    indexes: {
      grade: string;
      sectorId: ID;
    };
  };
  ascents: {
    key: ID;
    value: Pre<Ascent>;
    indexes: { routeId: number };
  };
  sectors: {
    key: ID;
    value: Pre<Sector>;
    indexes: { areaId: number };
  };
  areas: {
    key: ID;
    value: Pre<Area>;
  };
}

export type RouteTransaction = IDBPTransaction<
  RoutesDB,
  ArrayLike<StoreNames<RoutesDB>>
>;

export async function getDB(): Promise<IDBPDatabase<RoutesDB>> {
  const db = await openDB<RoutesDB>("routes", 8, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const stores = db.objectStoreNames;
      if (!stores.contains("routes")) {
        db.createObjectStore("routes", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      const routesStore = transaction.objectStore("routes");
      if (!routesStore.indexNames.contains("grade")) {
        routesStore.createIndex("grade", "grade");
      }

      if (!routesStore.indexNames.contains("sectorId")) {
        routesStore.createIndex("sectorId", "sectorId");
      }

      if (!stores.contains("ascents")) {
        db.createObjectStore("ascents", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      const ascentsStore = transaction.objectStore("ascents");
      if (!ascentsStore.indexNames.contains("routeId")) {
        ascentsStore.createIndex("routeId", "routeId");
      }

      if (!stores.contains("sectors")) {
        db.createObjectStore("sectors", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      const sectorsStore = transaction.objectStore("sectors");
      if (!sectorsStore.indexNames.contains("areaId")) {
        sectorsStore.createIndex("areaId", "areaId");
      }

      if (!stores.contains("areas")) {
        db.createObjectStore("areas", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
}

export async function startTransaction(
  storeNames: ArrayLike<StoreNames<RoutesDB>>
): Promise<RouteTransaction> {
  const db = await getDB();
  return db.transaction(storeNames, "readonly");
}

export async function clear(): Promise<void> {
  const db = await getDB();
  db.clear("routes");
  db.clear("ascents");
}
