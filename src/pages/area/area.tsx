import PageTitle from "@/components/page-title";
import RouteTable from "@/components/routes/routes-table";
import SectorLinks from "@/components/sectors/sector-links";
import useRoutes, { sortByGrade } from "@/hooks/store/use-routes";
import { ID, RouteOverview } from "@/lib/routes/types";
import { Loader } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAreaContent from "./hook";

type Props = { areaId: ID };

function AreaContent(props: Props) {
  const { areaId } = props;

  const area = useAreaContent(areaId);

  const routes = useRoutes({
    sortBy: sortByGrade,
    filter: useCallback(
      (route: RouteOverview) => route.area.id == areaId,
      [areaId],
    ),
  });

  if (!area) {
    return <Loader />;
  }

  return (
    <div>
      <PageTitle title={area.area.name} subtitle={area.area.country} />
      <SectorLinks sectors={area.sectors} />
      <RouteTable routes={routes} />
    </div>
  );
}

export default function Area() {
  const { areaId } = useParams();
  const [parsedAreaId, setParsedAreaId] = useState<{ id: ID; valid: boolean }>({
    id: -1,
    valid: false,
  });

  useEffect(() => {
    const parsed = Number(areaId);
    if (Number.isNaN(parsed)) {
      setParsedAreaId({ id: -1, valid: false });
      return;
    }
    setParsedAreaId({ id: parsed, valid: true });
  }, [areaId]);

  if (!parsedAreaId.valid) {
    return <p>invalid area id</p>;
  }

  return <AreaContent areaId={parsedAreaId.id} />;
}
