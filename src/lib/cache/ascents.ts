import {
  Area,
  Ascent,
  getRoute,
  ID,
  Route,
  Sector,
  StoreData,
} from "@/lib/routes";

export type AscentOverview = {
  ascent: Ascent;
  route: Route;
  sector: Sector;
  area: Area;
};

export function getAscents(data: StoreData): Ascent[] {
  return [...data.ascents.keys()].map((id) => getAscent(data, id));
}

export function getAscentOverviews(data: StoreData): AscentOverview[] {
  return [...data.ascents.keys()].map((id) => getAscentOverview(data, id));
}

export function getAscent(data: StoreData, id: ID): Ascent {
  const ascent = data.ascents.get(id);

  if (!ascent) {
    throw new Error("Ascent does not exist");
  }
  return ascent;
}

export function getAscentOverview(data: StoreData, id: ID): AscentOverview {
  const ascent = getAscent(data, id);
  const routeOverview = getRoute(data, ascent.routeId);
  return { ascent, ...routeOverview };
}

export function ascentsForRoute(data: StoreData, routeId: ID): Ascent[] {
  return [...data.ascents.values()].filter(
    (ascent) => ascent.routeId == routeId,
  );
}
