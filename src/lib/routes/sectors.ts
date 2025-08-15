import { getArea } from "./areas";
import { getDB } from "./db";
import { routesForSector } from "./routes";
import { ID, Pre, Sector, SectorOverview, StoreData } from "./types";

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

export function getSectors(data: StoreData): SectorOverview[] {
  return [...data.sectors.keys()].map((id) => getSector(data, id));
}

export function getSector(data: StoreData, id: ID): SectorOverview {
  const sector = data.sectors.get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  const area = getArea(data, sector.areaId);
  const routes = [...data.routes.values()].filter(
    (route) => route.sectorId == id,
  );

  return { sector, area, routes };
}

export type SectorWithRouteCount = {
  sector: Sector;
  routeCount: number;
};
export function sectorsForArea(
  data: StoreData,
  areaId: ID,
): SectorWithRouteCount[] {
  return [...data.sectors.values()]
    .filter((sector) => sector.areaId == areaId)
    .map((sector) => ({
      sector,
      routeCount: routesForSector(data, sector.id).length,
    }));
}
