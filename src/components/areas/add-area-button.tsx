import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Area, Pre } from "@/lib/routes";
import { AreaForm } from "./area-form";

type Props = {
  onAreaCreated: (area: Pre<Area>) => Promise<void>;
};

export default function AddAreaButton(props: Props) {
  const [areaOpenend, { open: areaOpen, close: areaClose }] =
    useDisclosure(false);

  const { onAreaCreated } = props;

  return (
    <>
      <Modal opened={areaOpenend} onClose={() => areaClose()} title="New area">
        <AreaForm onSubmit={(area) => onAreaCreated(area).then(areaClose)} />
      </Modal>
      <Button onClick={areaOpen}>New area</Button>
    </>
  );
}
