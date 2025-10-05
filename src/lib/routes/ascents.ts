import { getDB } from "./db";
import { getRoute } from "./routes";
import { Ascent, AscentOverview, ID, Pre, StoreData } from "./types";

export async function addAscent(ascent: Pre<Ascent>): Promise<ID> {
  const db = await getDB();
  return db.add("ascents", ascent);
}

export function getAscents(data: StoreData): AscentOverview[] {
  return [...data.ascents.keys()].map((id) => getAscent(data, id));
}

export function getAscent(data: StoreData, id: ID): AscentOverview {
  const ascent = data.ascents.get(id);

  if (!ascent) {
    throw new Error("Ascent does not exist");
  }

  const routeOverview = getRoute(data, ascent.routeId);

  return { ascent, ...routeOverview };
}

export function ascentsForRoute(data: StoreData, routeId: ID): Ascent[] {
  return [...data.ascents.values()].filter(
    (ascent) => ascent.routeId == routeId,
  );
}
