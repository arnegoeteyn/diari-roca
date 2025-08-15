import { AscentBody, Route, RouteOverview } from "@/lib/routes/types";
import React from "react";

export type RouteContextType = RouteOverview & {
  updateRoute: (r: Route) => Promise<void>;
  logAscent: (a: AscentBody) => Promise<void>;
};

export const RouteContext = React.createContext<RouteContextType | undefined>(
  undefined,
);
