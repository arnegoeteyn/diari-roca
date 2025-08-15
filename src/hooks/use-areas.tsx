import { getAreas } from "@/lib/routes/areas";
import { sectorsForArea } from "@/lib/routes/sectors";
import { AreaOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";

type Props = unknown;
export default function useAreas(props?: Props): [AreaOverview[], () => void] {
  const [areas, setAreas] = useState<AreaOverview[]>([]);
  const [shouldRefetch, refetch] = useState({});
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    const areas = getAreas(store.data);
    const overviews = areas.map((area) => ({
      area,
      sectors: sectorsForArea(store.data, area.id),
    }));
    setAreas(overviews);
  }, [props, shouldRefetch, store.data]);

  return [areas, () => refetch({})];
}
