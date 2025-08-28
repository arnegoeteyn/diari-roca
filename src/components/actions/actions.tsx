import { isActive } from "@/util";
import SectorsActions from "@/components/actions/sectors-actions";
import AscentsActions from "./ascents-actions";
import RoutesActions from "./routes-actions";
import AreaActions from "./area-actions";
import { useParams } from "react-router-dom";

type Props = {
  location: string;
};
export default function Actions(props: Props) {
  const { sectorId, areaId } = useParams();

  if (isActive(props.location, "ascents")) {
    return <AscentsActions />;
  }

  if (isActive(props.location, "routes")) {
    return <RoutesActions />;
  }

  if (isActive(props.location, "sectors")) {
    const sectorIdNumber = Number(sectorId);
    return <SectorsActions sectorId={sectorIdNumber} />;
  }

  if (isActive(props.location, "areas")) {
    const areaIdNumber = Number(areaId);
    return <AreaActions areaId={areaIdNumber} />;
  }

  return <div data-testid="no-actions"></div>;
}
