import PageTitle from "@/components/page-title";
import RouteTable from "@/components/routes/routes-table";
import DeleteSectorButton from "@/components/sectors/delete-sector-button";
import { useRoutesStore } from "@/hooks/store/use-store";
import { getRouteOverviews, getSectorOverview, sortByGrade } from "@/lib/cache";
import { ID } from "@/lib/routes/types";
import { Group, Loader } from "@mantine/core";
import { useMemo } from "react";

type Props = {
  sectorId: ID;
};
export default function SectorContent(props: Props) {
  const { sectorId } = props;
  const store = useRoutesStore((store) => store.store);

  const sector = useMemo(
    () =>
      store.initialized ? getSectorOverview(store.data, sectorId) : undefined,
    [sectorId, store.data, store.initialized],
  );

  const routes = useMemo(
    () =>
      store.initialized
        ? getRouteOverviews(store.data)
            .filter((route) => route.sector.id == sectorId)
            .sort(sortByGrade)
        : [],
    [sectorId, store.data, store.initialized],
  );

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
