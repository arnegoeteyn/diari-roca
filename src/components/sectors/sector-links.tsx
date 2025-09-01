import { SectorWithRouteCount } from "@/lib/routes";
import { Grid, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";

type Props = {
  sectors: SectorWithRouteCount[];
};
export default function SectorLinks(props: Props) {
  const sorted = props.sectors.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <Grid mx={128} my={32}>
        {sorted.map((sector) => (
          <Grid.Col my={0} span={3}>
            <NavLink
              component={Link}
              to={`/sectors/${sector.id}`}
              label={`${sector.name} (${sector.routeCount})`}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
