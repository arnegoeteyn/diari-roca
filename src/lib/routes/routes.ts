import { getDB, RouteTransaction } from "./db";
import { ID, Pre } from "./types";
import { _deleteAscent } from "./ascents";

export enum RouteKind {
  Sport = "sport",
  Boulder = "boulder",
}
export type Media = {
  label?: string;
  link: string;
};
export type RouteBody = {
  name: string;
  grade: string;
  comment?: string;
  beta?: string;
  media: Media[];
  kind: RouteKind;
};

export type Route = RouteBody & {
  id: ID;
  sectorId: ID;
};

export async function addRoute(route: Pre<Route>) {
  const db = await getDB();
  return db.add("routes", route);
}

export async function putRoute(route: Route) {
  const db = await getDB();
  await db.put("routes", route);
}

export async function deleteRoute(id: ID): Promise<void> {
  const db = await getDB();

  const tx = db.transaction(["routes", "ascents"], "readwrite");
  await _deleteRoute(tx, id);
  tx.commit();
  return tx.done;
}

async function _deleteRoute(transaction: RouteTransaction, routeId: ID) {
  const ascentsStore = transaction.objectStore("ascents");
  const index = ascentsStore.index("routeId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(routeId, routeId));

  for (const key of keys) {
    await _deleteAscent(transaction, key);
  }

  const store = transaction.objectStore("routes");
  return store.delete(routeId);
}

// todo, where to put this? Need this?
export async function routeIdsForSector(
  transcation: RouteTransaction,
  sectorId: ID,
): Promise<ID[]> {
  const store = transcation.objectStore("routes");
  const index = store.index("sectorId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(sectorId, sectorId));

  return keys;
}
