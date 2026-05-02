import { Ascent, Pre, Route, AscentKind } from "@/lib/routes";
import { useRoutesStore } from "./use-store";

export function useCreateRoute() {
  const addRoute = useRoutesStore((s) => s.addRoute);
  const addAscent = useRoutesStore((s) => s.addAscent);

  const createRoute = async (
    route: Pre<Route>,
    ascent?: AscentKind,
  ): Promise<void> => {
    const routeId = await addRoute(route);
    if (ascent) {
      const today = new Date().toISOString().split("T")[0];
      const newAscent: Pre<Ascent> = { date: today, kind: ascent, routeId };
      await addAscent(newAscent);
    }
  };

  return { createRoute };
}
