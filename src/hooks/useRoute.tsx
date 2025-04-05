import { getRoute } from "@/lib/routes/routes";
import { RouteWithAscents } from "@/lib/routes/types";
import { useEffect, useState } from "react";

export function useRoute(routeId?: string): [RouteWithAscents, boolean] {
  const [route, setRoute] = useState<RouteWithAscents>({} as RouteWithAscents);
  const [loading, setLoading] = useState<boolean>(true);

  // todo, query can happen here or something?
  useEffect(() => {
    const parsed = Number(routeId);
    if (Number.isNaN(parsed)) {
      throw new Error(`Invalid routeId requested: ${routeId}`);
    }
    const fetch = async () => {
      setLoading(true);
      const route = await getRoute(parsed);
      setRoute(route);
      setLoading(false);
    };
    fetch();
  }, [routeId]);

  return [route, loading];
}
