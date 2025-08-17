import PageTitle from "@/components/page-title";
import RouteTable from "@/components/routes/routes-table";
import useRoutes, { sortByGrade } from "@/hooks/use-routes";
import useSector from "@/hooks/use-sector";
import { ID, RouteOverview } from "@/lib/routes/types";
import { Loader } from "@mantine/core";
import { useCallback } from "react";

type Props = {
  sectorId: ID;
};
export default function SectorContent(props: Props) {
  const { sectorId } = props;

  const [sector] = useSector(sectorId);

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
      <PageTitle
        title={sector.sector.name}
        subtitle={sector.area.name}
      ></PageTitle>
      <RouteTable routes={routes} />
    </>
  );
}
