import { getRoutes } from "@/lib/routes/routes";
import { RouteKind, RouteOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";

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
  const store = useRoutesStore((store) => store.store);

  const { sortBy, kind, filter } = props || {};

  // todo, query can happen here or something?
  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const routes = getRoutes(store.data);

    const filtered = filter ? routes.filter(filter) : routes;
    const sorted = sortBy ? filtered.sort(sortBy) : filtered;

    setRoutes(sorted);
  }, [filter, kind, sortBy, store]);

  return routes;
}
