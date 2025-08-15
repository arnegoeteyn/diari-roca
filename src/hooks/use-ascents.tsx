import { AscentOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getAscents } from "@/lib/routes/ascents";

type Props = {
  sortBy?: (a: AscentOverview, b: AscentOverview) => number;
};

// Sort ascents by comparing the ascent dates. Sorts ascending.
export const sortByDate = (a: AscentOverview, b: AscentOverview) =>
  a.ascent.date.localeCompare(b.ascent.date);

export const sortByDateDesc = (a: AscentOverview, b: AscentOverview) =>
  -sortByDate(a, b);

export default function useAscents(props?: Props): AscentOverview[] {
  const [ascents, setAscents] = useState<AscentOverview[]>([]);
  const store = useRoutesStore((store) => store.store);

  const { sortBy } = props || {};

  // todo, query can happen here or something?
  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const ascents = getAscents(store.data);
    const sorted = sortBy ? ascents.sort(sortBy) : ascents;

    setAscents(sorted);
  }, [store, sortBy]);

  return ascents;
}
