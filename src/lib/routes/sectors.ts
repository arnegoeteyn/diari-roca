import { routesOverviewsForSector } from "../cache";
import { getDB, RouteTransaction } from "./db";
import { _deleteRoute } from "./routes";
import { ID, Pre, StoreData } from "./types";

export type Sector = {
  id: ID;
  areaId: ID;
  name: string;
};

export async function addSector(sector: Pre<Sector>) {
  const db = await getDB();
  return db.add("sectors", sector);
}

export async function putSector(sector: Sector) {
  const db = await getDB();
  await db.put("sectors", sector);
}

export async function deleteSector(id: ID): Promise<void> {
  const db = await getDB();

  const tx = db.transaction(["routes", "ascents", "sectors"], "readwrite");
  await _deleteSector(tx, id);
  tx.commit();
  return tx.done;
}

export async function _deleteSector(
  transaction: RouteTransaction,
  sectorId: ID,
) {
  const routesStore = transaction.objectStore("routes");
  const index = routesStore.index("sectorId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(sectorId, sectorId));

  for (const key of keys) {
    await _deleteRoute(transaction, key);
  }

  const store = transaction.objectStore("sectors");
  return store.delete(sectorId);
}

// todo: where to put this, do we even want this?
export type SectorWithRouteCount = Sector & { routeCount: number };

export function sectorsForAreaWithCount(
  data: StoreData,
  areaId: ID,
): SectorWithRouteCount[] {
  return [...data.sectors.values()]
    .filter((sector) => sector.areaId == areaId)
    .map((sector) => ({
      ...sector,
      routeCount: routesOverviewsForSector(data, sector.id).length,
    }));
}
