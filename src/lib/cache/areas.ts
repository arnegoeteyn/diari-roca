import { Area, ID, StoreData } from "@/lib/routes";

export function getArea(data: StoreData, id: ID): Area {
  const area = data.areas.get(id);

  if (!area) {
    throw new Error("Area does not exist");
  }

  return area;
}
