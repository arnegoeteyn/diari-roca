import AscentsOverviewTable from "@/components/ascents/ascents-overview-table";
import useAscents, { sortByDateDesc } from "@/hooks/use-ascents";

export default function AscentsPage() {
  const ascents = useAscents({ sortBy: sortByDateDesc });
  return <AscentsOverviewTable ascents={ascents} />;
}
