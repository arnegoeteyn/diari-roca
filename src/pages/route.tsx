import PageTitle from "@/components/page-title";
import RouteActions from "@/components/routes/route-actions";
import AscentsList from "@/components/ascents/ascents-list";
import RouteBreadcrumbs from "@/components/routes/route-breadcrumbs";
import RouteInformation from "@/components/routes/route-information";
import { SimpleGrid, Stack } from "@mantine/core";
import { useParams } from "react-router-dom";
import RouteMedia from "@/components/routes/route-media";
import { useRouteContext } from "@/contexts/route-context-util";
import { RouteContextProvider } from "@/contexts/route-context-provider";

export function RouteContent() {
  const { route, ascents, deleteAscent } = useRouteContext();
  return (
    <div>
      <RouteBreadcrumbs />
      <PageTitle title={route.name} subtitle={`${route.grade}/${route.kind}`} />

      <SimpleGrid cols={{ sm: 1, lg: 2 }}>
        <Stack>
          <RouteInformation route={route} />
          <RouteActions hideVisitAction />
          <RouteMedia />
        </Stack>
        <div>
          <AscentsList ascents={ascents} onDeleteAscent={deleteAscent} />
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
