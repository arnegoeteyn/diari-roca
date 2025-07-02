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
};

// Sort functions by comparing the grades. Sorts descending.
export const sortByGrade = (a: RouteOverview, b: RouteOverview) =>
  -a.route.grade.localeCompare(b.route.grade);

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
