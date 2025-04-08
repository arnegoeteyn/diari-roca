import { getArea, getAreas } from "@/lib/routes/areas";
import { startTransaction } from "@/lib/routes/db";
import { sectorsForArea } from "@/lib/routes/sectors";
import { AreaOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";

type Props = unknown;
export default function useAreas(props?: Props): [AreaOverview[], boolean] {
  const [areas, setAreas] = useState<AreaOverview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // todo, query can happen here or something?
  useEffect(() => {
    const fetch = async () => {
      const areaKeys = await getAreas();

      const transaction = await startTransaction(["areas", "sectors"]);

      let areas = [];

      areas = await Promise.all(
        areaKeys.map(async (key) => {
          const route = getArea(transaction, key);
          return route;
        })
      );

      const overviews = await Promise.all(
        areas.map(async (area) => {
          const sectors = await sectorsForArea(area.id, transaction);
          return { area, sectors };
        })
      );

      await transaction.done;

      setAreas(overviews);
      setLoading(false);
    };
    fetch();
  }, [props]);

  return [areas, loading];
}
