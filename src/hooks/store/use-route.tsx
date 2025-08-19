import { getRoute } from "@/lib/routes/routes";
import { RouteOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";

export function useRoute(routeId?: string): RouteOverview | undefined {
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

    const route = getRoute(store.data, parsed);

    setRoute(route);
  }, [store, routeId]);

  return route;
}
