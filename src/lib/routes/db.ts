import { Ascent, ID, Pre, Route } from "./types";
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
  };
  ascents: {
    key: ID;
    value: Pre<Ascent>;
    indexes: { routeId: number };
  };
}

export type RouteTransaction = IDBPTransaction<
  RoutesDB,
  ArrayLike<StoreNames<RoutesDB>>
>;

export async function getDB(): Promise<IDBPDatabase<RoutesDB>> {
  const db = await openDB<RoutesDB>("routes", 5, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const stores = db.objectStoreNames;
      if (!stores.contains("routes")) {
        db.createObjectStore("routes", {
          keyPath: "id",
          autoIncrement: true,
        });
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
    },
  });
  return db;
}

export async function startTransaction(
  storeNames: ArrayLike<StoreNames<RoutesDB>>
): Promise<IDBPTransaction<RoutesDB, ArrayLike<StoreNames<RoutesDB>>>> {
  const db = await getDB();
  return db.transaction(storeNames, "readonly");
}

export async function clear(): Promise<void> {
  const db = await getDB();
  db.clear("routes");
  db.clear("ascents");
}
