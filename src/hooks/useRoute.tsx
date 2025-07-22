import { startTransaction } from "@/lib/routes/db";
import { getRoute } from "@/lib/routes/routes";
import { RouteOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";

export function useRoute(routeId?: string): [RouteOverview, boolean] {
  const [route, setRoute] = useState<RouteOverview>({} as RouteOverview);
  const [loading, setLoading] = useState<boolean>(true);

  // todo, query can happen here or something?
  useEffect(() => {
    const parsed = Number(routeId);
    if (Number.isNaN(parsed)) {
      throw new Error(`Invalid routeId requested: ${routeId}`);
    }
    const fetch = async () => {
      setLoading(true);

      const transaction = await startTransaction([
        "routes",
        "ascents",
        "areas",
        "sectors",
      ]);
      const route = await getRoute(transaction, parsed);
      await transaction.done;

      setRoute(route);
      setLoading(false);
    };
    fetch();
  }, [routeId]);

  return [route, loading];
}
