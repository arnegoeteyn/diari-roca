import AscentsOverviewTable from "@/components/ascents/ascents-overview-table";
import useAscents from "@/hooks/use-ascents";

export default function AscentsPage() {
  const ascents = useAscents();
  return <AscentsOverviewTable ascents={ascents} />;
}
