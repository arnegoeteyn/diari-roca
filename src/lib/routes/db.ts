import {
  Area,
  Ascent,
  ID,
  Pre,
  Route,
  RouteKind,
  Sector,
  StoreData,
  Trip,
} from "./types";
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
      kind: [RouteKind, string]; // kind, grade
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
    indexes: { name: string };
  };
  trips: {
    key: ID;
    value: Pre<Trip>;
  };
}

export type RouteTransaction = IDBPTransaction<
  RoutesDB,
  ArrayLike<StoreNames<RoutesDB>>
>;

export async function getDB(): Promise<IDBPDatabase<RoutesDB>> {
  const db = await openDB<RoutesDB>("routes", 11, {
    upgrade(db, _oldVersion, _newVersion, transaction) {
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

      if (!routesStore.indexNames.contains("kind")) {
        routesStore.createIndex("kind", ["kind", "grade"]);
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

      const areasStore = transaction.objectStore("areas");
      if (!areasStore.indexNames.contains("name")) {
        areasStore.createIndex("name", "name");
      }

      if (!stores.contains("trips")) {
        db.createObjectStore("trips", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
}

async function loadSet<Name extends StoreNames<RoutesDB>>(
  db: IDBPDatabase<RoutesDB>,
  name: Name,
): Promise<Map<ID, RoutesDB[Name]["value"] & { id: RoutesDB[Name]["key"] }>> {
  const transaction = db.transaction(name);
  const store = transaction.objectStore(name);
  return await store
    .getAllKeys()
    .then((keys) =>
      Promise.all(
        keys.map((key) => store.get(key).then((item) => ({ item, key }))),
      ),
    )
    .then((items) =>
      items.reduce((map, { item, key }) => {
        if (item) {
          map.set(key, { ...item, id: key });
        }
        return map;
      }, new Map<ID, RoutesDB[Name]["value"] & { id: RoutesDB[Name]["key"] }>()),
    );
}

export async function load(): Promise<StoreData> {
  console.time("load db");
  const db = await getDB();

  const areas = await loadSet(db, "areas");
  const sectors = await loadSet(db, "sectors");
  const routes = await loadSet(db, "routes");
  const ascents = await loadSet(db, "ascents");
  const trips = await loadSet(db, "trips");

  console.timeEnd("load db");
  return {
    areas,
    sectors,
    routes,
    ascents,
    trips,
  };
}

export async function startTransaction(
  storeNames: ArrayLike<StoreNames<RoutesDB>>,
): Promise<RouteTransaction> {
  const db = await getDB();
  return db.transaction(storeNames, "readonly");
}

export async function clear(): Promise<void> {
  const db = await getDB();
  db.clear("routes");
  db.clear("ascents");
  db.clear("areas");
  db.clear("sectors");
  db.clear("trips");
}
