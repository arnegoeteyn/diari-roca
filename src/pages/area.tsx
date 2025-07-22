import { PageTitle } from "@/components/page-title";
import RouteTable from "@/components/routes-table";
import useArea from "@/hooks/use-area";
import useRoutes, { useAreaFilter } from "@/hooks/use-routes";
import { ID } from "@/lib/routes/types";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = { areaId: ID };
function AreaContent(props: Props) {
  const { areaId } = props;

  const [filter, filterLoading] = useAreaFilter(areaId);
  const [area, areaLoading, refetch] = useArea(areaId);

  const [routes, routesLoading, routesRefetch] = useRoutes({
    sortBy: "grade",
    filter,
    skip: filterLoading,
  });

  if (areaLoading || routesLoading) {
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

  console.log("realod page");

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
