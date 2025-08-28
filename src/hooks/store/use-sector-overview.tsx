import { ID, SectorOverview } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSectorOverview } from "@/lib/routes/sectors";
import { routesForSector } from "@/lib/routes/routes";

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
    const routeOverviews = routesForSector(store.data, sectorId);
    const routes = routeOverviews.map((overview) => overview.route);
    setSector({ sector: sector.sector, routes, area: sector.area });
  }, [sectorId, store.data, store.initialized]);

  return sector;
}
