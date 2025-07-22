import { AscentOverview } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getAscents } from "@/lib/routes/ascents";

type Props = {};

export default function useAscents(_props?: Props): AscentOverview[] {
  const [ascents, setAscents] = useState<AscentOverview[]>([]);
  const store = useRoutesStore((store) => store.store);

  // todo, query can happen here or something?
  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const ascents = getAscents(store.data);

    setAscents(ascents);
  }, [store]);

  return ascents;
}
