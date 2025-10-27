import { ID, Sector } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getSector } from "@/lib/cache/sectors";

type Props = {
  sectorId: ID;
};
export default function useSector(props: Props): Sector | undefined {
  const [sector, setSector] = useState<Sector>();
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }

    const sector = getSector(store.data, props.sectorId);

    setSector(sector);
  }, [store, props.sectorId]);

  return sector;
}
