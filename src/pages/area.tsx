import { PageTitle } from "@/components/page-title";
import useArea from "@/hooks/use-area";
import { ID } from "@/lib/routes/types";
import { Loader, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = { areaId: ID };
function AreaContent(props: Props) {
  const { areaId } = props;
  const [area, loading, refetch] = useArea(areaId);

  if (loading) {
    return <Loader />;
  }

  return <PageTitle title={area.area.name} subtitle={area.area.country} />;
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

  const renderState = () => {
    if (!parsedAreaId.valid) {
      return <p>invalid area id</p>;
    }

    return <AreaContent areaId={parsedAreaId.id} />;
  };

  return renderState();
}
