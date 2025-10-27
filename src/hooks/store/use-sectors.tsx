import { ID, Sector } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSectors } from "@/lib/cache/sectors";

type Props = {
  areaId?: ID;
};
export default function useSectors(props?: Props): Sector[] | undefined {
  const [sectors, setSectors] = useState<Sector[]>();
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const sectors = getSectors(store.data);

    const filtered = filterOnArea(sectors);

    setSectors(filtered);
  }, [store, props?.areaId]);

  return sectors;
}

function filterOnArea(sectors: Sector[], areaId?: ID): Sector[] {
  if (!areaId) {
    return sectors;
  }
  return sectors.filter((s) => s.areaId == areaId);
}
