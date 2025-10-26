import { useRoute } from "@/hooks/store/use-route";
import { useRoutesStore } from "@/hooks/store/use-store";
import { Ascent, AscentBody, ID, Pre, Route } from "@/lib/routes";
import { Loader } from "@mantine/core";
import { RouteContext } from "./route-context";

type Props = React.PropsWithChildren<{
  routeId: ID;
}>;

export function RouteContextProvider(props: Props) {
  const route = useRoute(props.routeId);
  const putRoute = useRoutesStore((store) => store.putRoute);
  const addAscent = useRoutesStore((store) => store.addAscent);
  const deleteAscent = useRoutesStore((store) => store.deleteAscent);
  const _deleteRoute = useRoutesStore((store) => store.deleteRoute);

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
      value={{ ...route, updateRoute, logAscent, deleteAscent, deleteRoute }}
    >
      {props.children}
    </RouteContext.Provider>
  );
}
