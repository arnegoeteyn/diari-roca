import AddRouteButton from "@/components/routes/add-route-button";
import RouteTable from "@/components/routes/routes-table";
import useRoutes from "@/hooks/use-routes";
import useSectors from "@/hooks/use-sectors";
import { RouteKind, RouteOverview } from "@/lib/routes/types";
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

  const sectors = useSectors();

  return (
    <Tabs defaultValue="sport">
      <Group justify="space-between" pr={128}>
        <Tabs.List>
          <Tabs.Tab value="sport">Routes</Tabs.Tab>
          <Tabs.Tab value="boulder">Boulders</Tabs.Tab>
        </Tabs.List>
        <AddRouteButton sectors={sectors} />
      </Group>
      <Tabs.Panel value="sport">
        <RouteTable routes={routes} />
      </Tabs.Panel>
      <Tabs.Panel value="boulder">
        <RouteTable routes={boulders} />
      </Tabs.Panel>
    </Tabs>
  );
}
