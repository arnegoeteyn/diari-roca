import { Trip } from "@/lib/routes/types";
import { useEffect, useState } from "react";
import { useRoutesStore } from "./use-store";
import { getTrips } from "@/lib/routes/trips";

type Props = unknown;
export default function useTrips(props?: Props): Trip[] {
  const [trips, setTrips] = useState<Trip[]>([]);
  const store = useRoutesStore((store) => store.store);

  useEffect(() => {
    if (!store.initialized) {
      return;
    }
    const trips = getTrips(store.data);
    setTrips(trips);
  }, [props, store.data, store.initialized]);

  return trips;
}
