import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Area, Pre, Sector } from "@/lib/routes";
import { SectorForm } from "../areas/sector-form";

type Props = {
  areas: Area[];
  onSectorCreated: (area: Pre<Sector>) => Promise<void>;
};

export default function AddSectorButton(props: Props) {
  const [sectorOpened, { open: sectorOpen, close: sectorClose }] =
    useDisclosure(false);

  const { areas, onSectorCreated } = props;

  return (
    <>
      <Modal
        opened={sectorOpened}
        onClose={() => sectorClose()}
        title="New sector"
      >
        <SectorForm
          areas={areas}
          onSubmit={(sector) => onSectorCreated(sector).then(sectorClose)}
        />
      </Modal>
      <Button onClick={sectorOpen}>New sector</Button>
    </>
  );
}
