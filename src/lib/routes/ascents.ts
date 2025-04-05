import { getDB, RouteTransaction } from "./db";
import { Ascent, ID, Pre } from "./types";

export async function addAscent(ascent: Pre<Ascent>) {
  const db = await getDB();
  db.add("ascents", ascent);
}

export async function getAscent(
  id: ID,
  transaction: RouteTransaction
): Promise<Ascent> {
  const ascent = await transaction.objectStore("ascents").get(id);

  if (!ascent) {
    throw new Error("Route does not exist");
  }

  return { ...ascent, id };
}

export async function ascentsForRoute(
  routeId: ID,
  transcation: RouteTransaction
): Promise<Ascent[]> {
  const store = transcation.objectStore("ascents");
  const index = store.index("routeId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(routeId, routeId));

  const ascents = Promise.all(keys.map((key) => getAscent(key, transcation)));
  return ascents;
}
