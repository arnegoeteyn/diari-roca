import AscentsOverviewTable from "@/components/ascents/ascents-overview-table";
import { useRoutesStore } from "@/hooks/store/use-store";
import { getTrips } from "@/lib/routes/trips";
import { useMemo } from "react";
import useAscents from "./hook";

export default function Ascents() {
  const ascents = useAscents();
  const store = useRoutesStore((store) => store.store);
  const trips = useMemo(() => getTrips(store.data), [store.data]);
  return <AscentsOverviewTable ascents={ascents} trips={trips} />;
}
