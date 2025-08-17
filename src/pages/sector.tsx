import { useParams } from "react-router-dom";
import SectorContent from "./sector-content";

export default function Route() {
  const { sectorId } = useParams();

  const numericSectorId = Number(sectorId);

  if (isNaN(numericSectorId)) {
    return <p>Woops, got a bad id: {sectorId}</p>;
  }

  return <SectorContent sectorId={numericSectorId} />;
}
