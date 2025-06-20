import RouteAscents from "@/components/routes/route-ascents";
import RouteInformation from "@/components/routes/route-information";
import { useRoute } from "@/hooks/use-route";
import {
  Anchor,
  Breadcrumbs,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";

export default function Route() {
  const { routeId } = useParams();

  const [route, loading] = useRoute(routeId);

  if (Number.isNaN(routeId)) {
    return <p>Invalid routeId</p>;
  }

  if (loading) {
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

      <Group>
        <Title>{route.route.name}</Title>
        <Title order={2} c="gray">
          [{route.route.grade}/{route.route.kind}]
        </Title>
      </Group>

      <SimpleGrid cols={{ sm: 1, lg: 2 }}>
        <RouteInformation route={route.route} />
        <div>
          <RouteAscents ascents={route.ascents} />
          <Text>hier komen later foto's</Text>
        </div>
      </SimpleGrid>
    </div>
  );
}
