import { isActive } from "@/util";
import AscentsActions from "./ascents-actions";
import RoutesActions from "./routes-actions";

type Props = {
  location: string;
};
export default function Actions(props: Props) {
  if (isActive(props.location, "ascents")) {
    return <AscentsActions />;
  }

  if (isActive(props.location, "routes")) {
    return <RoutesActions />;
  }

  return <div data-testid="no-actions"></div>;
}
