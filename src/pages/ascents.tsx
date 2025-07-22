import useAscents from "@/hooks/use-ascents";

export default function AscentsPage() {
  const ascents = useAscents();
  return JSON.stringify(ascents);
}
