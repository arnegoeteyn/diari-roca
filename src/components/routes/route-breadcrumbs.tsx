import {
  RouteContextType,
  useOptionalRouteContext,
} from "@/contexts/route-context";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { Link } from "react-router-dom";

type Props = Partial<RouteContextType>;

export default function RouteBreadcrumbs(props: Props) {
  const context = useOptionalRouteContext();
  const sector = props.sector || context?.sector;
  const area = props.area || context?.area;

  if (!sector || !area) {
    throw new Error(
      "RouteBreadcrumbs must receive either props or be use with RouteContextProvider"
    );
  }

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
