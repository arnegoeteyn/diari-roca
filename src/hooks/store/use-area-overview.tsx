import { getArea } from "@/lib/routes/areas";
import { AreaOverview, ID } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "@/hooks/store/use-store";
import { sectorsForArea } from "@/lib/routes/sectors";

export default function useAreaOverview(areaId: ID): AreaOverview | undefined {
  const [area, setArea] = useState<AreaOverview>();
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }
    const area = getArea(store.data, areaId);
    const sectors = sectorsForArea(store.data, areaId);
    setArea({ area, sectors });
  }, [areaId, store.data, store.initialized]);

  return area;
}
