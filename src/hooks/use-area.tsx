import { getArea } from "@/lib/routes/areas";
import { AreaOverview, ID } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import { sectorsForArea } from "@/lib/routes/sectors";

export default function useArea(
  areaId: ID
): [AreaOverview | undefined, () => void] {
  const [area, setArea] = useState<AreaOverview>();
  const [shouldRefetch, refetch] = useState(0);
  const store = useStore((store) => store.store);

  useEffect(() => {
    console.log(shouldRefetch);
    if (!store.initialized) {
      return;
    }
    const area = getArea(store.data, areaId);
    const sectors = sectorsForArea(store.data, areaId);
    setArea({ area, sectors });
  }, [areaId, shouldRefetch, store.data, store.initialized]);

  return [area, () => refetch((n) => n + 1)];
}
