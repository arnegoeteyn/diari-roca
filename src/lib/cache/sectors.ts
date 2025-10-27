import { Area, ID, Pre, Route, Sector, StoreData } from "@/lib/routes";
import { deleteRoute, routesForSector } from "./routes";
import { getArea } from "./areas";

export type SectorOverview = {
  routes: Route[];
  sector: Sector;
  area: Area;
};
export function getSector(data: StoreData, id: ID): Sector {
  const sector = data.sectors.get(id);

  if (!sector) {
    throw new Error("Sector does not exist");
  }

  return sector;
}

export function getSectors(data: StoreData): Sector[] {
  return [...data.sectors.keys()].map((id) => getSector(data, id));
}

export function getSectorOverview(data: StoreData, id: ID): SectorOverview {
  const sector = getSector(data, id);

  const area = getArea(data, sector.areaId);
  const routes = [...data.routes.values()].filter(
    (route) => route.sectorId == id,
  );

  return { sector, area, routes };
}

export function getSectorOverviews(data: StoreData): SectorOverview[] {
  return [...data.sectors.keys()].map((id) => getSectorOverview(data, id));
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

export function sectorsForArea(data: StoreData, areaID: ID) {
  return getSectors(data).filter((sector) => sector.areaId == areaID);
}
