import { SectorOverview } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSectors } from "@/lib/routes/sectors";

export default function useSectors(): SectorOverview[] {
  const [sectors, setSectors] = useState<SectorOverview[]>([]);
  const store = useRoutesStore((store) => store.store);

  // todo, query can happen here or something?
  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const sectors = getSectors(store.data);

    setSectors(sectors);
  }, [store]);

  return sectors;
}
