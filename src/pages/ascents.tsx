import AscentsOverviewTable from "@/components/ascents/ascents-overview-table";
import useAscents, { sortByDateDesc } from "@/hooks/store/use-ascents";
import useTrips from "@/hooks/store/use-trips";

export default function AscentsPage() {
  const ascents = useAscents({ sortBy: sortByDateDesc });
  const trips = useTrips();
  return <AscentsOverviewTable ascents={ascents} trips={trips} />;
}
