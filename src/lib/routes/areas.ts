import { getDB } from "./db";
import { Area, ID, Pre, StoreData } from "./types";

export async function addArea(area: Pre<Area>) {
  const db = await getDB();
  db.add("areas", area);
}

export async function putArea(area: Area) {
  const db = await getDB();
  db.put("areas", area);
}

export function getArea(data: StoreData, id: ID): Area {
  const area = data.areas.get(id);

  if (!area) {
    throw new Error("Area does not exist");
  }

  return area;
}

export function getAreas(data: StoreData): Area[] {
  return [...data.areas.keys()].map((id) => getArea(data, id));
}
