import { startTransaction } from "@/lib/routes/db";
import { getRoutes, getRoute } from "@/lib/routes/routes";
import { Route, RouteKind, RouteOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";

type Props = {
  sortBy?: keyof Route;
  kind?: RouteKind;
  filter?: (route: Route) => boolean;
};
export default function useRoutes(props?: Props): [RouteOverview[], boolean] {
  const [routes, setRoutes] = useState<RouteOverview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // todo, query can happen here or something?
  useEffect(() => {
    const fetch = async () => {
      const routeKeys = await getRoutes(props?.kind);

      const transaction = await startTransaction([
        "ascents",
        "routes",
        "sectors",
        "areas",
      ]);

      let routes = [];

      routes = await Promise.all(
        routeKeys.map(async (key) => {
          const route = getRoute(transaction, key);
          return route;
        })
      );

      if (props?.filter) {
        const filter = props.filter;
        routes = routes.filter((r) => filter(r.route));
      }

      await transaction.done;

      setRoutes(routes);
      setLoading(false);
    };
    fetch();
  }, [props]);

  return [routes, loading];
}
