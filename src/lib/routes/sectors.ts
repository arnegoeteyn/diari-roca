import { getDB, RouteTransaction } from "./db";
import { ID, Pre, Sector } from "./types";

export async function addSector(sector: Pre<Sector>) {
  const db = await getDB();
  db.add("sectors", sector);
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

export async function sectorsForArea(
  areaId: ID,
  transcation: RouteTransaction
): Promise<Sector[]> {
  const store = transcation.objectStore("sectors");
  const index = store.index("areaId");

  const keys = await index.getAllKeys(IDBKeyRange.bound(areaId, areaId));

  const sectors = Promise.all(keys.map((key) => getSector(transcation, key)));
  return sectors;
}
