import { useRoutesStore } from "@/hooks/store/use-store";
import {
  Area,
  getArea,
  ID,
  routesForSector,
  Sector,
  sectorsForArea,
} from "@/lib/routes";
import { useEffect, useState } from "react";
import SectorContent from "../sector-content";

type AreaContent = {
  area: Area;
  sectors: SectorContent[];
};

type SectorContent = Sector & { routeCount: number };

export default function useAreaContent(areaId: ID): AreaContent | undefined {
  const [area, setArea] = useState<AreaContent>();
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }
    const area = getArea(store.data, areaId);
    const sectors = sectorsForArea(store.data, areaId);

    const sectorContents: SectorContent[] = sectors.map((sector) => ({
      ...sector,
      routeCount: routesForSector(store.data, sector.id).length,
    }));

    setArea({ area: area, sectors: sectorContents } as AreaContent);
  }, [areaId, store.data, store.initialized]);

  return area;
}
