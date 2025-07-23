import { isActive } from "@/util";
import AscentsActions from "./ascents-actions";

type Props = {
  location: string;
};
export default function Actions(props: Props) {
  if (isActive(props.location, "ascents")) {
    return <AscentsActions />;
  }
}
