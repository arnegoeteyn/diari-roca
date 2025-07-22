import RouteTable from "@/components/routes-table";
import useRoutes from "@/hooks/use-routes";
import { RouteKind } from "@/lib/routes/types";
import { Tabs } from "@mantine/core";

const routesParam = { kind: RouteKind.Sport };
const boulderParams = { kind: RouteKind.Boulder };

export default function Routes() {
  const [routes] = useRoutes(routesParam);
  const [boulders] = useRoutes(boulderParams);

  return (
    <div>
      <Tabs defaultValue="sport">
        <Tabs.List>
          <Tabs.Tab value="sport">Routes</Tabs.Tab>
          <Tabs.Tab value="boulder">Boulders</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="sport">
          <RouteTable routes={routes} />
        </Tabs.Panel>
        <Tabs.Panel value="boulder">
          <RouteTable routes={boulders} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
