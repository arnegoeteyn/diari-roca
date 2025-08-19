import { getAreas } from "@/lib/routes/areas";
import { sectorsForArea } from "@/lib/routes/sectors";
import { AreaOverview } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";

export default function useAreas(): AreaOverview[] {
  const [areas, setAreas] = useState<AreaOverview[]>([]);
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    const areas = getAreas(store.data);
    const overviews = areas.map((area) => ({
      area,
      sectors: sectorsForArea(store.data, area.id),
    }));
    setAreas(overviews);
  }, [store.data]);

  return areas;
}
