import RouteTable from "@/components/routes/routes-table";
import useRoutes from "@/hooks/store/use-routes";
import { RouteOverview } from "@/lib/cache";
import { RouteKind } from "@/lib/routes";
import { Group, Tabs } from "@mantine/core";

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
    <Tabs
      defaultValue="sport"
      style={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Group justify="space-between">
        <Tabs.List>
          <Tabs.Tab value="sport">Routes</Tabs.Tab>
          <Tabs.Tab value="boulder">Boulders</Tabs.Tab>
        </Tabs.List>
      </Group>
      <Tabs.Panel value="sport" style={{ flex: 1 }}>
        <RouteTable routes={routes} />
      </Tabs.Panel>
      <Tabs.Panel value="boulder" style={{ flex: 1 }}>
        <RouteTable routes={boulders} />
      </Tabs.Panel>
    </Tabs>
  );
}
