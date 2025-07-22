import { getArea } from "@/lib/routes/areas";
import { startTransaction } from "@/lib/routes/db";
import { sectorsForArea } from "@/lib/routes/sectors";
import { AreaOverview, ID } from "@/lib/routes/types";
import { useEffect, useState } from "react";

export default function useArea(
  areaId: ID
): [AreaOverview, boolean, () => void] {
  const [area, setArea] = useState<AreaOverview>({} as AreaOverview);
  const [loading, setLoading] = useState<boolean>(true);

  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const transaction = await startTransaction([
        "areas",
        "sectors",
        "routes",
      ]);

      const area = await getArea(transaction, areaId);
      const sectors = await sectorsForArea(areaId, transaction);

      setArea({ area, sectors });
      setLoading(false);
    };
    fetch();
  }, [areaId, shouldRefetch]);

  return [area, loading, () => refetch({})];
}
