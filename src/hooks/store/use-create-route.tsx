import { AscentBody, Ascent, Pre, Route } from "@/lib/routes";
import { useRoutesStore } from "./use-store";

export function useCreateRoute() {
  const addRoute = useRoutesStore((s) => s.addRoute);
  const addAscent = useRoutesStore((s) => s.addAscent);

  const createRoute = async (
    route: Pre<Route>,
    ascent?: AscentBody,
  ): Promise<void> => {
    const routeId = await addRoute(route);
    if (ascent) {
      const newAscent: Pre<Ascent> = { ...ascent, routeId };
      await addAscent(newAscent);
    }
  };

  return { createRoute };
}
