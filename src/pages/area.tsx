import { PageTitle } from "@/components/page-title";
import RouteTable from "@/components/routes/routes-table";
import useArea from "@/hooks/use-area";
import useRoutes, { sortByGrade } from "@/hooks/use-routes";
import { ID, RouteOverview } from "@/lib/routes/types";
import { Loader } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = { areaId: ID };
function AreaContent(props: Props) {
  const { areaId } = props;

  const [area] = useArea(areaId);
  console.log(area, !!area);

  const routes = useRoutes({
    sortBy: sortByGrade,
    filter: useCallback(
      (route: RouteOverview) => route.area.id == areaId,
      [areaId]
    ),
  });

  if (!area) {
    return <Loader />;
  }

  return (
    <div>
      <PageTitle title={area.area.name} subtitle={area.area.country} />
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
