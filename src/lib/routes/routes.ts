import { getArea } from "./areas";
import { ascentsForRoute, ascentsForRouteCached } from "./ascents";
import { getDB, RouteTransaction } from "./db";
import { getSector, getSectorCached } from "./sectors";
import { ID, Pre, Route, RouteOverview, Store, StoreData } from "./types";

export async function addRoute(route: Pre<Route>) {
  const db = await getDB();
  db.add("routes", route);
}

export function getRouteCached(data: StoreData, id: ID): RouteOverview {
  const route = data.routes.get(id);

  if (!route) {
    throw new Error("Route does not exist");
  }

  const ascents = ascentsForRouteCached(data, id);
  const sector = getSectorCached(data, route.sectorId);
  const area = getArea(data, sector.areaId);

  return { route, ascents, sector, area };
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
export function getRoutes(data: StoreData): RouteOverview[] {
  return [...data.routes.keys()].map((id) => getRouteCached(data, id));
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

export function routesForSector(
  data: StoreData,
  sectorId: ID
): RouteOverview[] {
  return [...data.routes.values()]
    .filter((route) => route.sectorId == sectorId)
    .map((route) => getRouteCached(data, route.id));
}
