import { Area, getArea } from "./areas";
import { getDB } from "./db";
import { Route, routesForSector } from "./routes";
import { ID, Pre, StoreData } from "./types";

export type Sector = {
  id: ID;
  areaId: ID;
  name: string;
};

export type SectorOverview = {
  routes: Route[];
  sector: Sector;
  area: Area;
};

export async function addSector(sector: Pre<Sector>) {
  const db = await getDB();
  return db.add("sectors", sector);
}

export function getSectorCached(data: StoreData, id: ID): Sector {
  const sector = data.sectors.get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  return sector;
}

export function getSectors(data: StoreData): Sector[] {
  return [...data.sectors.keys()].map((id) => getSector(data, id));
}

export function getSectorOverviews(data: StoreData): SectorOverview[] {
  return [...data.sectors.keys()].map((id) => getSectorOverview(data, id));
}

export function getSector(data: StoreData, id: ID): Sector {
  const sector = data.sectors.get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  return sector;
}

export function getSectorOverview(data: StoreData, id: ID): SectorOverview {
  const sector = getSector(data, id);

  const area = getArea(data, sector.areaId);
  const routes = [...data.routes.values()].filter(
    (route) => route.sectorId == id,
  );

  return { sector, area, routes };
}

export function sectorsForArea(data: StoreData, areaID: ID) {
  return getSectors(data).filter((sector) => sector.areaId == areaID);
}

export type SectorWithRouteCount = Sector & { routeCount: number };

export function sectorsForAreaWithCount(
  data: StoreData,
  areaId: ID,
): SectorWithRouteCount[] {
  return [...data.sectors.values()]
    .filter((sector) => sector.areaId == areaId)
    .map((sector) => ({
      ...sector,
      routeCount: routesForSector(data, sector.id).length,
    }));
}
