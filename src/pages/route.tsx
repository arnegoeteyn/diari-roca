import { PageTitle } from "@/components/page-title";
import RouteActions, { ACTION } from "@/components/routes/route-actions";
import RouteAscents from "@/components/routes/route-ascents";
import RouteInformation from "@/components/routes/route-information";
import { useRoute } from "@/hooks/use-route";
import { Anchor, Breadcrumbs, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

export default function Route() {
  const { routeId } = useParams();

  const route = useRoute(routeId);

  if (Number.isNaN(routeId)) {
    return <p>Invalid routeId</p>;
  }

  if (!route) {
    return <p>loading</p>;
  }

  return (
    <div>
      <Breadcrumbs pb={4}>
        <Anchor component={Link} to={`/areas/${route.area.id}`}>
          {route.area.name}
        </Anchor>
        <Anchor component={Link} to={`/sectors/${route.sector.id}`}>
          {route.sector.name}
        </Anchor>
      </Breadcrumbs>

      <PageTitle
        title={route.route.name}
        subtitle={`${route.route.grade}/${route.route.kind}`}
      />

      <SimpleGrid cols={{ sm: 1, lg: 2 }}>
        <Stack>
          <RouteInformation route={route.route} />
          <RouteActions
            shownActions={[ACTION.edit, ACTION.log, ACTION.delete]}
          />
        </Stack>
        <div>
          <RouteAscents ascents={route.ascents} />
          <Text>hier komen later foto's</Text>
        </div>
      </SimpleGrid>
    </div>
  );
}
