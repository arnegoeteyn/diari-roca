import { getArea } from "./areas";
import { ascentsForRoute } from "./ascents";
import { getDB, RouteTransaction } from "./db";
import { getSector } from "./sectors";
import { ID, Pre, Route, RouteOverview } from "./types";

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
export async function getRoutes(): Promise<ID[]> {
  const db = await getDB();
  return (await db.getAllKeysFromIndex("routes", "grade")).reverse();
}
