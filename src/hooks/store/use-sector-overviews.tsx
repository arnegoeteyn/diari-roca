import { ID, SectorOverview } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSectorOverviews } from "@/lib/routes";

type Props = {
  areaId?: ID;
};

export default function useSectorOverviews(props?: Props): SectorOverview[] {
  const [sectors, setSectors] = useState<SectorOverview[]>([]);
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const sectors = getSectorOverviews(store.data);
    const filtered = filterOnArea(sectors, props?.areaId);

    setSectors(filtered);
  }, [store, props?.areaId]);

  return sectors;
}

function filterOnArea(
  sectors: SectorOverview[],
  areaId?: ID,
): SectorOverview[] {
  if (!areaId) {
    return sectors;
  }
  return sectors.filter((s) => s.sector.areaId == areaId);
}
