import { useRoute } from "@/hooks/use-route";
import { useRoutesStore } from "@/hooks/use-store";
import { Route, RouteOverview } from "@/lib/routes/types";
import { Loader } from "@mantine/core";
import { useIsFirstRender } from "@mantine/hooks";
import React from "react";

export type RouteContextType = RouteOverview & {
  updateRoute: (r: Route) => Promise<void>;
};

export const RouteContext = React.createContext<RouteContextType | undefined>(
  undefined
);

type Props = React.PropsWithChildren<{
  routeId: string;
}>;

export function RouteContextProvider(props: Props) {
  const route = useRoute(props.routeId);
  const putRoute = useRoutesStore((store) => store.putRoute);

  const updateRoute = (route: Route) => putRoute(route);

  if (!route) {
    console.warn("no route");
    return <Loader />;
  }

  return (
    <RouteContext.Provider value={{ ...route, updateRoute }}>
      {props.children}
    </RouteContext.Provider>
  );
}

export function useRouteContext(): RouteContextType {
  const context = React.useContext(RouteContext);
  if (context === undefined) {
    throw new Error(
      "useRouteContext must be used within a RouteContextProvider"
    );
  }
  return context;
}
