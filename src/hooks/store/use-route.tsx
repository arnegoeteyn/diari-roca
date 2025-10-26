import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getRouteOverview, RouteOverview } from "@/lib/cache";
import { ID } from "@/lib/routes";

export function useRoute(routeId?: ID): RouteOverview | undefined {
  const [route, setRoute] = useState<RouteOverview>();
  const store = useRoutesStore((store) => store.store);

  // todo, query can happen here or something?
  useEffect(() => {
    if (!store.initialized) {
      return;
    }
    const parsed = Number(routeId);
    if (Number.isNaN(parsed)) {
      throw new Error(`Invalid routeId requested: ${routeId}`);
    }

    try {
      const route = getRouteOverview(store.data, parsed);
      setRoute(route);
    } catch {
      return;
    }
  }, [store, routeId]);

  return route;
}
