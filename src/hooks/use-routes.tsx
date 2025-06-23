import { startTransaction } from "@/lib/routes/db";
import { getRoutes, getRoute } from "@/lib/routes/routes";
import { sectorsForArea } from "@/lib/routes/sectors";
import { ID, Route, RouteKind, RouteOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";

type Props = {
  sortBy?: keyof Route;
  kind?: RouteKind;
  filter?: (route: Route) => boolean;
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

export default function useRoutes(props?: Props): [RouteOverview[], boolean] {
  const [routes, setRoutes] = useState<RouteOverview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { sortBy, kind, filter, skip } = props || {};

  // todo, query can happen here or something?
  useEffect(() => {
    const fetch = async () => {
      if (skip) {
        return;
      }
      console.log("props changed");
      const routeKeys = await getRoutes(kind);

      const transaction = await startTransaction([
        "ascents",
        "routes",
        "sectors",
        "areas",
      ]);

      let routes = [];

      console.time("all" + kind);
      routes = await Promise.all(
        routeKeys.map(async (key) => {
          const route = getRoute(transaction, key);
          return route;
        })
      );

      if (filter) {
        routes = routes.filter((r) => filter(r.route));
      }

      await transaction.done;
      console.timeEnd("all" + kind);

      setRoutes(routes);
      setLoading(false);
    };
    fetch();
  }, [filter, kind, skip]);

  return [routes, loading];
}
