import { getDB, RouteTransaction } from "./db";
import { routeIdsForSector, routesForSector } from "./routes";
import { ID, Pre, Sector, StoreData } from "./types";

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

export async function getSector(
  transaction: RouteTransaction,
  id: ID
): Promise<Sector> {
  const sector = await transaction.objectStore("sectors").get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  return { ...sector, id };
}

export type SectorWithRouteCount = {
  sector: Sector;
  routeCount: number;
};
export function sectorsForArea(
  data: StoreData,
  areaId: ID
): SectorWithRouteCount[] {
  return [...data.sectors.values()]
    .filter((sector) => sector.areaId == areaId)
    .map((sector) => ({
      sector,
      routeCount: routesForSector(data, sector.id).length,
    }));
}
