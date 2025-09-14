import { useRoutesStore } from "@/hooks/store/use-store";
import { AreaOverview, getAreas, sectorsForAreaWithCount } from "@/lib/routes";

type AreaContent = AreaOverview;

export default function useAreas(): AreaContent[] {
  const store = useRoutesStore((store) => store.store);
  const areas: AreaContent[] = getAreas(store.data).map((area) => ({
    ...area,
    sectors: sectorsForAreaWithCount(store.data, area.id),
  }));

  return areas;
}
