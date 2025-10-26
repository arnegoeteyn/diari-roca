import { RouteOverview } from "@/lib/cache";
import { AscentBody, Route, ID } from "@/lib/routes";
import React from "react";

export type RouteContextType = RouteOverview & {
  updateRoute: (r: Route) => Promise<void>;
  logAscent: (a: AscentBody) => Promise<void>;
  deleteAscent: (a: ID) => Promise<void>;
  deleteRoute: () => Promise<void>;
};

export const RouteContext = React.createContext<RouteContextType | undefined>(
  undefined,
);
