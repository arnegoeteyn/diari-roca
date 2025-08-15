import { useRoute } from "@/hooks/use-route";
import { useRoutesStore } from "@/hooks/use-store";
import {
  Ascent,
  AscentBody,
  Pre,
  Route,
  RouteOverview,
} from "@/lib/routes/types";
import { Loader } from "@mantine/core";
import React from "react";

export type RouteContextType = RouteOverview & {
  updateRoute: (r: Route) => Promise<void>;
  logAscent: (a: AscentBody) => Promise<void>;
};

export const RouteContext = React.createContext<RouteContextType | undefined>(
  undefined,
);

type Props = React.PropsWithChildren<{
  routeId: string;
}>;

export function RouteContextProvider(props: Props) {
  const route = useRoute(props.routeId);
  const putRoute = useRoutesStore((store) => store.putRoute);
  const addAscent = useRoutesStore((store) => store.addAscent);

  const updateRoute = (route: Route) => putRoute(route);

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
    <RouteContext.Provider value={{ ...route, updateRoute, logAscent }}>
      {props.children}
    </RouteContext.Provider>
  );
}

export function useOptionalRouteContext(): RouteContextType | undefined {
  return React.useContext(RouteContext);
}

export function useRouteContext(): RouteContextType {
  const context = React.useContext(RouteContext);
  if (context === undefined) {
    throw new Error(
      "useRouteContext must be used within a RouteContextProvider",
    );
  }
  return context;
}
