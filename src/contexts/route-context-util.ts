import React from "react";
import { RouteContext, RouteContextType } from "./route-context";

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
