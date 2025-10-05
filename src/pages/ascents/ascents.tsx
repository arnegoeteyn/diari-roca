import AscentsOverviewTable from "@/components/ascents/ascents-overview-table";
import useTrips from "@/hooks/store/use-trips";
import useAscents from "./hook";

export default function Ascents() {
  const ascents = useAscents();
  const trips = useTrips();
  return <AscentsOverviewTable ascents={ascents} trips={trips} />;
}
