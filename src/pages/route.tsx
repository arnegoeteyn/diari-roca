import { PageTitle } from "@/components/page-title";
import RouteActions from "@/components/routes/route-actions";
import AscentsList from "@/components/ascents/ascents-list";
import RouteBreadcrumbs from "@/components/routes/route-breadcrumbs";
import RouteInformation from "@/components/routes/route-information";
import {
  RouteContextProvider,
  useRouteContext,
} from "@/contexts/route-context";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import { useParams } from "react-router-dom";

export function RouteContent() {
  const { route, ascents } = useRouteContext();
  return (
    <div>
      <RouteBreadcrumbs />
      <PageTitle title={route.name} subtitle={`${route.grade}/${route.kind}`} />

      <SimpleGrid cols={{ sm: 1, lg: 2 }}>
        <Stack>
          <RouteInformation route={route} />
          <RouteActions hideVisitAction />
          <Text>hier komen later foto's</Text>
        </Stack>
        <div>
          <AscentsList ascents={ascents} />
        </div>
      </SimpleGrid>
    </div>
  );
}

export default function Route() {
  const { routeId } = useParams();

  if (!routeId) {
    return <p>No route id</p>;
  }

  return (
    <RouteContextProvider routeId={routeId}>
      <RouteContent />
    </RouteContextProvider>
  );
}
