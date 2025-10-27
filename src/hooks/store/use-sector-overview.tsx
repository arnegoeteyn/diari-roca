import { ID } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSectorOverview, SectorOverview } from "@/lib/cache/sectors";
import { routesOverviewsForSector } from "@/lib/cache";

export default function useSectorOverview(
  sectorId: ID,
): SectorOverview | undefined {
  const [sector, setSector] = useState<SectorOverview>();
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }
    const sector = getSectorOverview(store.data, sectorId);
    const routeOverviews = routesOverviewsForSector(store.data, sectorId);
    const routes = routeOverviews.map((overview) => overview.route);
    setSector({ sector: sector.sector, routes, area: sector.area });
  }, [sectorId, store.data, store.initialized]);

  return sector;
}
