import TextOverview from "@/components/stats/text-overview";
import useStats from "./hook";

export default function Stats() {
  const stats = useStats();
  return <TextOverview overview={stats} />;
}
