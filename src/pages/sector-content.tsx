import PageTitle from "@/components/page-title";
import RouteTable from "@/components/routes/routes-table";
import DeleteSectorButton from "@/components/sectors/delete-sector-button";
import useRoutes, { sortByGrade } from "@/hooks/store/use-routes";
import useSectorOverview from "@/hooks/store/use-sector-overview";
import { RouteOverview } from "@/lib/cache";
import { ID } from "@/lib/routes/types";
import { Group, Loader } from "@mantine/core";
import { useCallback } from "react";

type Props = {
  sectorId: ID;
};
export default function SectorContent(props: Props) {
  const { sectorId } = props;

  const sector = useSectorOverview(sectorId);

  const routes = useRoutes({
    sortBy: sortByGrade,
    filter: useCallback(
      (route: RouteOverview) => route.sector.id == sectorId,
      [sectorId],
    ),
  });

  if (!sector) {
    return <Loader />;
  }

  return (
    <>
      <Group>
        <PageTitle title={sector.sector.name} subtitle={sector.area.name} />
        <DeleteSectorButton sectorId={sectorId} />
      </Group>
      <RouteTable routes={routes} />
    </>
  );
}
