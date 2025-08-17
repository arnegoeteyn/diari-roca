import { ID, SectorOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSector } from "@/lib/routes/sectors";
import { routesForSector } from "@/lib/routes/routes";

export default function useSector(
  sectorId: ID,
): [SectorOverview | undefined, () => void] {
  const [sector, setSector] = useState<SectorOverview>();
  const [shouldRefetch, refetch] = useState(0);
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }
    const sector = getSector(store.data, sectorId);
    const routeOverviews = routesForSector(store.data, sectorId);
    const routes = routeOverviews.map((overview) => overview.route);
    setSector({ sector: sector.sector, routes, area: sector.area });
  }, [sectorId, shouldRefetch, store.data, store.initialized]);

  return [sector, () => refetch((n) => n + 1)];
}
