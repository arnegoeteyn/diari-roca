import { ascentsForRoute } from "./ascents";
import { getDB, RouteTransaction, startTransaction } from "./db";
import { Ascent, ID, Pre, Route } from "./types";

export async function addRoute(route: Pre<Route>) {
  const db = await getDB();
  db.add("routes", route);
}

export async function getRoute(
  id: ID,
  transaction?: RouteTransaction
): Promise<{ route: Route; ascents: Ascent[] }> {
  transaction = transaction
    ? transaction
    : await startTransaction(["routes", "ascents"]);

  const route = await transaction.objectStore("routes").get(id);

  if (!route) {
    throw new Error("Route does not exist");
  }

  const ascents = await ascentsForRoute(id, transaction);

  return { route: { ...route, id }, ascents: ascents };
}

// add query or something
export async function getRoutes(): Promise<ID[]> {
  const db = await getDB();
  return db.getAllKeys("routes");
}
