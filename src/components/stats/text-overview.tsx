import { StoreData } from "@/lib/routes";
import { counts } from "@/lib/stats/counts";

type Props = {
  overview: StoreData;
};

export default function TextOverview(props: Props) {
  const stats = counts(props.overview);

  return <p>{JSON.stringify(stats)}</p>;
}
