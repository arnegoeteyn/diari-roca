import { startTransaction } from "@/lib/routes/db";
import { getRoutes } from "@/lib/routes/routes";
import { sectorsForArea } from "@/lib/routes/sectors";
import { ID, Route, RouteKind, RouteOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useStore } from "./use-store";

type Props = {
  sortBy?: (a: RouteOverview, b: RouteOverview) => number;
  kind?: RouteKind;
  filter?: (route: RouteOverview) => boolean;
  skip?: boolean;
};

export function useAreaFilter(id: ID): [(route: Route) => boolean, boolean] {
  const [filter, setFilter] = useState<(route: Route) => boolean>(() => false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const calculate = async () => {
      const transaction = await startTransaction(["sectors", "routes"]);
      const sectors = await sectorsForArea(transaction, id).then((sectors) =>
        sectors.map((sector) => sector.sector.id)
      );
      setFilter(() => (route: Route) => sectors.includes(route.sectorId));
      setLoading(false);
    };
    calculate();
  }, [id]);
  return [filter, loading];
}

export default function useRoutes(props?: Props): RouteOverview[] {
  const [routes, setRoutes] = useState<RouteOverview[]>([]);
  const store = useStore((store) => store.store);

  const { sortBy, kind, filter, skip } = props || {};

  // todo, query can happen here or something?
  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const routes = getRoutes(store.data);

    const filtered = filter ? routes.filter(filter) : routes;
    const sorted = sortBy ? filtered.sort(sortBy) : filtered;

    setRoutes(sorted);
  }, [filter, kind, skip, sortBy, store]);

  return routes;
}
