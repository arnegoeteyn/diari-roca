import { ID, Sector, StoreData } from "@/lib/routes";

export function getSector(data: StoreData, id: ID): Sector {
  const sector = data.sectors.get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  return sector;
}
