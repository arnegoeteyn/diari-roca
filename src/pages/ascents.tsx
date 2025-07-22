import AscentsOverviewTable from "@/components/ascents/ascents-overview-table";
import useAscents, { sortByDateDesc } from "@/hooks/use-ascents";
import useTrips from "@/hooks/use-trips";

export default function AscentsPage() {
  const ascents = useAscents({ sortBy: sortByDateDesc });
  const trips = useTrips();
  return <AscentsOverviewTable ascents={ascents} trips={trips} />;
}
