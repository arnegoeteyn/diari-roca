import useArea from "@/hooks/use-area";
import { ID } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Areas() {
  const { areaId } = useParams();
  const [parsedAreaId, setParsedAreaId] = useState<{ id: ID; valid: boolean }>({
    id: -1,
    valid: false,
  });

  const [area, loading, refetch] = useArea(parsedAreaId.id);

  useEffect(() => {
    const parsed = Number(areaId);
    if (Number.isNaN(parsed)) {
      setParsedAreaId({ id: -1, valid: false });
      return;
    }
    setParsedAreaId({ id: parsed, valid: true });
  }, [areaId]);

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <h1>{area.area.name}</h1>
    </>
  );
}
