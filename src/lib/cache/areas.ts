import { Area, ID, Pre, StoreData } from "@/lib/routes";

export function getArea(data: StoreData, id: ID): Area {
  const area = data.areas.get(id);

  if (!area) {
    throw new Error("Area does not exist");
  }

  return area;
}

export function storeArea(data: StoreData, id: ID, area: Pre<Area>) {
  const updatedAreas = new Map(data.areas);
  updatedAreas.set(id, { ...area, id: id });
  return { ...data, areas: updatedAreas };
}
