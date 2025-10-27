import { ID, Pre, Sector, StoreData } from "@/lib/routes";
import { deleteRoute, routesForSector } from "./routes";

export function getSector(data: StoreData, id: ID): Sector {
  const sector = data.sectors.get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  return sector;
}

export function addSector(data: StoreData, id: ID, sector: Pre<Sector>) {
  const updatedSectors = new Map(data.sectors);
  updatedSectors.set(id, { ...sector, id: id });
  return { ...data, sectors: updatedSectors };
}

export function deleteSector(data: StoreData, id: ID) {
  const linkedRoutes = routesForSector(data, id);
  for (const route of linkedRoutes) {
    data = deleteRoute(data, route.id);
  }

  const updatedSectors = new Map(data.sectors);
  updatedSectors.delete(id);
  return { ...data, sectors: updatedSectors };
}
