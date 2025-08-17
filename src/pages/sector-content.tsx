import PageTitle from "@/components/page-title";
import useSector from "@/hooks/use-sector";
import { ID } from "@/lib/routes/types";
import { Loader } from "@mantine/core";

type Props = {
  sectorId: ID;
};
export default function SectorContent(props: Props) {
  const { sectorId } = props;

  const [sector] = useSector(sectorId);

  if (!sector) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title={sector.sector.name}
        subtitle={sector.area.name}
      ></PageTitle>
    </>
  );
}
