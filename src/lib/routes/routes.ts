import { getArea } from "./areas";
import { ascentsForRoute } from "./ascents";
import { getDB, RouteTransaction } from "./db";
import { getSectorCached } from "./sectors";
import { ID, Pre, Route, RouteOverview, StoreData } from "./types";

export async function addRoute(route: Pre<Route>) {
  const db = await getDB();
  db.add("routes", route);
}

export async function putRoute(route: Route) {
  const db = await getDB();
  await db.put("routes", route);
}

export function getRoute(data: StoreData, id: ID): RouteOverview {
  const route = data.routes.get(id);

  if (!route) {
    throw new Error("Route does not exist");
  }

  const ascents = ascentsForRoute(data, id);
  const sector = getSectorCached(data, route.sectorId);
  const area = getArea(data, sector.areaId);

  return { route, ascents, sector, area };
}

// add query or something
export function getRoutes(data: StoreData): RouteOverview[] {
  return [...data.routes.keys()].map((id) => getRoute(data, id));
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
    .map((route) => getRoute(data, route.id));
}
