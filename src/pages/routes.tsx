import RouteTable from "@/components/routes/routes-table";
import useRoutes from "@/hooks/store/use-routes";
import { RouteOverview } from "@/lib/cache";
import { RouteKind } from "@/lib/routes";
import { Tabs } from "@mantine/core";

const routesParam = {
  filter: (route: RouteOverview) => route.route.kind == RouteKind.Sport,
  sortBy: (a: RouteOverview, b: RouteOverview) =>
    -a.route.grade.localeCompare(b.route.grade),
};
const boulderParams = {
  filter: (route: RouteOverview) => route.route.kind == RouteKind.Boulder,
  sortBy: (a: RouteOverview, b: RouteOverview) =>
    -a.route.grade.localeCompare(b.route.grade),
};

export default function Routes() {
  const routes = useRoutes(routesParam);
  const boulders = useRoutes(boulderParams);

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
