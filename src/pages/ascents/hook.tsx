import { useRoutesStore } from "@/hooks/store/use-store";
import { AscentOverview, getAscentOverviews } from "@/lib/cache";

export default function useAscents(): AscentOverview[] {
  const store = useRoutesStore((store) => store.store);
  const ascents: AscentOverview[] = getAscentOverviews(store.data);

  ascents.sort((a, b) => -a.ascent.date.localeCompare(b.ascent.date));

  return ascents;
}
