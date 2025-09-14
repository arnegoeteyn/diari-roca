import { getDB } from "./db";
import { SectorWithRouteCount } from "./sectors";
import { ID, Pre, StoreData } from "./types";

export type Area = {
  id: ID;
  name: string;
  country: string;
};

export type AreaOverview = Area & {
  sectors: SectorWithRouteCount[];
};

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

export async function addArea(area: Pre<Area>) {
  const db = await getDB();
  return db.add("areas", area);
}

export async function putArea(area: Area) {
  const db = await getDB();
  db.put("areas", area);
}
