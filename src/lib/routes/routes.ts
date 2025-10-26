import { getRouteOverview, RouteOverview } from "../cache/routes";
import { getDB, RouteTransaction } from "./db";
import { ID, Pre, StoreData } from "./types";

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

export async function routeIdsForSector(
  transcation: RouteTransaction,
  sectorId: ID,
): Promise<ID[]> {
  const store = transcation.objectStore("routes");
  const index = store.index("sectorId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(sectorId, sectorId));

  return keys;
}

// todo move to cache
export function routesForSector(
  data: StoreData,
  sectorId: ID,
): RouteOverview[] {
  return [...data.routes.values()]
    .filter((route) => route.sectorId == sectorId)
    .map((route) => getRouteOverview(data, route.id));
}
