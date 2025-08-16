import { useParams } from "react-router-dom";
import SectorContent from "./sector-content";

export default function Route() {
  const { sectorId } = useParams();

  if (!sectorId || isNaN(Number(sectorId))) {
    return <p>Woops, go a bad id: {sectorId}</p>;
  }

  return <SectorContent />;
}
