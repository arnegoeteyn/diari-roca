import { useRoutesStore } from "@/hooks/store/use-store";
import { getRouteOverview } from "@/lib/cache";
import { Ascent, AscentBody, ID, Pre, Route } from "@/lib/routes";
import { Loader } from "@mantine/core";
import { useMemo } from "react";
import { RouteContext } from "./route-context";

type Props = React.PropsWithChildren<{
  routeId: ID;
}>;

export function RouteContextProvider(props: Props) {
  const store = useRoutesStore((store) => store.store);
  const putRoute = useRoutesStore((store) => store.putRoute);
  const addAscent = useRoutesStore((store) => store.addAscent);
  const putAscent = useRoutesStore((store) => store.putAscent);
  const deleteAscent = useRoutesStore((store) => store.deleteAscent);
  const _deleteRoute = useRoutesStore((store) => store.deleteRoute);

  const route = useMemo(() => {
    const parsed = Number(props.routeId);
    if (Number.isNaN(parsed)) {
      console.warn(`Invalid routeId requested: ${props.routeId}`);
      return undefined;
    }
    if (!store.initialized) {
      return undefined;
    }
    try {
      return getRouteOverview(store.data, parsed);
    } catch {
      return undefined;
    }
  }, [props.routeId, store.data, store.initialized]);

  const updateRoute = (route: Route) => putRoute(route);

  const deleteRoute = () => _deleteRoute(props.routeId);

  const logAscent = (ascent: AscentBody) => {
    if (!route) {
      throw new Error("logging an ascent while route is not loaded");
    }
    const routeAscent: Pre<Ascent> = { ...ascent, routeId: route.route.id };
    return addAscent(routeAscent);
  };

  if (!route) {
    console.warn("no route");
    return <Loader />;
  }

  return (
    <RouteContext.Provider
      value={{
        ...route,
        updateRoute,
        logAscent,
        deleteAscent,
        deleteRoute,
        updateAscent: putAscent,
      }}
    >
      {props.children}
    </RouteContext.Provider>
  );
}
