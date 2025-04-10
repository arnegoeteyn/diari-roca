import { getArea } from "./areas";
import { ascentsForRoute } from "./ascents";
import { getDB, RouteTransaction } from "./db";
import { getSector } from "./sectors";
import { ID, Pre, Route, RouteKind, RouteOverview } from "./types";

export async function addRoute(route: Pre<Route>) {
  const db = await getDB();
  db.add("routes", route);
}

export async function getRoute(
  transaction: RouteTransaction,
  id: ID
): Promise<RouteOverview> {
  const route = await transaction.objectStore("routes").get(id);

  if (!route) {
    throw new Error("Route does not exist");
  }

  const [ascents, sector] = await Promise.all([
    ascentsForRoute(id, transaction),
    getSector(transaction, route.sectorId),
  ]);

  const area = await getArea(transaction, sector.areaId);

  return {
    route: { ...route, id },
    ascents,
    sector,
    area,
  };
}

// add query or something
export async function getRoutes(kind?: RouteKind): Promise<ID[]> {
  const db = await getDB();
  if (!kind) {
    return (await db.getAllKeysFromIndex("routes", "grade")).reverse();
  }

  return (
    await db.getAllKeysFromIndex(
      "routes",
      "kind",
      IDBKeyRange.bound([kind, ""], [kind, "ZZZZZZZZZ"])
    )
  ).reverse();
}

export async function routeIdsForSector(
  transcation: RouteTransaction,
  sectorId: ID
): Promise<ID[]> {
  const store = transcation.objectStore("routes");
  const index = store.index("sectorId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(sectorId, sectorId));

  return keys;
}

export async function routesForSector(
  transcation: RouteTransaction,
  sectorId: ID
): Promise<RouteOverview[]> {
  const store = transcation.objectStore("routes");
  const index = store.index("sectorId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(sectorId, sectorId));

  const routes = Promise.all(keys.map((key) => getRoute(transcation, key)));

  return routes;
}
