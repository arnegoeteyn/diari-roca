import RouteTable from "@/components/routes/routes-table";
import { useRoutesStore } from "@/hooks/store/use-store";
import { getRouteOverviews, RouteOverview, sortByGrade } from "@/lib/cache";
import { RouteKind } from "@/lib/routes";
import { Tabs } from "@mantine/core";
import { useMemo } from "react";

const isSport = (route: RouteOverview) => route.route.kind == RouteKind.Sport;
const isBoulder = (route: RouteOverview) =>
  route.route.kind == RouteKind.Boulder;

export default function Routes() {
  const store = useRoutesStore((store) => store.store);
  const routeOverviews = useMemo(
    () => getRouteOverviews(store.data),
    [store.data],
  );

  const routes = useMemo(
    () => routeOverviews.filter(isSport).sort(sortByGrade),
    [routeOverviews],
  );
  const boulders = useMemo(
    () => routeOverviews.filter(isBoulder).sort(sortByGrade),
    [routeOverviews],
  );

  return (
    <div style={{ height: "100%", paddingRight: 10 }}>
      <Tabs
        defaultValue="sport"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs.List style={{ height: "36px" }}>
          <Tabs.Tab value="sport">Routes</Tabs.Tab>
          <Tabs.Tab value="boulder">Boulders</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="sport" style={{ height: "calc(100% - 36px)" }}>
          <RouteTable routes={routes} />
        </Tabs.Panel>
        <Tabs.Panel value="boulder" style={{ height: "calc(100% - 36px)" }}>
          <RouteTable routes={boulders} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
