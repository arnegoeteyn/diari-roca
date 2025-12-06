import { ID, StoreData } from "@/lib/routes";

type RouteCounts = {
  ascentsCount: number;
  uniqueAscentsCount: number;
  routesCount: number;
  sectorsCount: number;
  areasCount: number;
  tripsCount: number;
};

export function counts(data: StoreData): RouteCounts {
  return {
    ascentsCount: data.ascents.size,
    uniqueAscentsCount: routesWithAscent(data).size,
    routesCount: data.routes.size,
    sectorsCount: data.sectors.size,
    areasCount: data.areas.size,
    tripsCount: data.trips.size,
  };
}

function routesWithAscent(data: StoreData): Set<ID> {
  const routeIDs = new Set<ID>();

  for (const ascent of data.ascents.values()) {
    if (!data.routes.has(ascent.routeId)) {
      console.warn(
        `ascent with id ${ascent.id} is attached to non-existing route with id ${ascent.routeId}`,
      );
      continue;
    }

    routeIDs.add(ascent.routeId);
  }

  return routeIDs;
}
