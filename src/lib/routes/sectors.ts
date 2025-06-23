import { getDB, RouteTransaction } from "./db";
import { routeIdsForSector } from "./routes";
import { ID, Pre, Sector } from "./types";

export async function addSector(sector: Pre<Sector>) {
  const db = await getDB();
  return db.add("sectors", sector);
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
export async function sectorsForArea(
  transcation: RouteTransaction,
  areaId: ID
): Promise<SectorWithRouteCount[]> {
  const store = transcation.objectStore("sectors");
  const index = store.index("areaId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(areaId, areaId));

  const sectors = Promise.all(
    keys.map(async (key) => {
      const sector = await getSector(transcation, key);
      const routes = await routeIdsForSector(transcation, key);
      return { sector, routeCount: routes.length };
    })
  );

  return sectors;
}
