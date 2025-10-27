import { Area, Ascent, ID, Pre, Route, Sector, StoreData } from "@/lib/routes";
import { ascentsForRoute, deleteAscent } from "./ascents";
import { getSector } from "./sectors";
import { getArea } from "./areas";

export type RouteOverview = {
  route: Route;
  ascents: Ascent[];
  sector: Sector;
  area: Area;
};

export function getRoute(data: StoreData, id: ID): Route {
  const route = data.routes.get(id);

  if (!route) {
    throw new Error("Route does not exist");
  }
  return route;
}

export function getRouteOverview(data: StoreData, id: ID): RouteOverview {
  const route = data.routes.get(id);

  if (!route) {
    throw new Error(`Route ${id} does not exist`);
  }

  const ascents = ascentsForRoute(data, id);
  const sector = getSector(data, route.sectorId);
  const area = getArea(data, sector.areaId);

  return { route, ascents, sector, area };
}

export function getRouteOverviews(data: StoreData): RouteOverview[] {
  return [...data.routes.keys()].map((id) => getRouteOverview(data, id));
}

export function addRoute(data: StoreData, id: ID, route: Pre<Route>) {
  const updatedRoutes = new Map(data.routes);
  updatedRoutes.set(id, { ...route, id: id });
  return { ...data, routes: updatedRoutes };
}

export function deleteRoute(data: StoreData, id: ID) {
  const linkedAscents = ascentsForRoute(data, id);
  for (const ascent of linkedAscents) {
    data = deleteAscent(data, ascent.id);
  }

  const updatedRoutes = new Map(data.routes);
  updatedRoutes.delete(id);
  return { ...data, routes: updatedRoutes };
}

export function routesForSector(data: StoreData, sectorId: ID): Route[] {
  return [...data.routes.values()].filter(
    (route) => route.sectorId == sectorId,
  );
}
//todo: delete this
export function routesOverviewsForSector(
  data: StoreData,
  sectorId: ID,
): RouteOverview[] {
  return [...data.routes.values()]
    .filter((route) => route.sectorId == sectorId)
    .map((route) => getRouteOverview(data, route.id));
}
