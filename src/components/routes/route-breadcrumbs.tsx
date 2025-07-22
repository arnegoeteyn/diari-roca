import { useRouteContext } from "@/contexts/route-context";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { Link } from "react-router-dom";

export default function RouteBreadcrumbs() {
  const { sector, area } = useRouteContext();

  return (
    <Breadcrumbs pb={4}>
      <Anchor component={Link} to={`/areas/${area.id}`}>
        {area.name}
      </Anchor>
      <Anchor component={Link} to={`/sectors/${sector.id}`}>
        {sector.name}
      </Anchor>
    </Breadcrumbs>
  );
}
