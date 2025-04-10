import { getDB, RouteTransaction } from "./db";
import { Area, ID, Pre } from "./types";

export async function addArea(area: Pre<Area>) {
  const db = await getDB();
  db.add("areas", area);
}

export async function putArea(area: Area) {
  const db = await getDB();
  db.put("areas", area);
}

export async function getArea(
  transaction: RouteTransaction,
  id: ID
): Promise<Area> {
  const area = await transaction.objectStore("areas").get(id);

  if (!area) {
    throw new Error("Area does not exist");
  }

  return { ...area, id };
}

export async function getAreas(): Promise<ID[]> {
  const db = await getDB();
  return await db.getAllKeys("areas");
}
