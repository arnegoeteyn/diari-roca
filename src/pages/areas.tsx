import { AreaForm } from "@/components/areas/area-form";
import AreasTable from "@/components/areas/areas-table";
import useAreas from "@/hooks/store/use-areas";
import { useRoutesStore } from "@/hooks/store/use-store";
import { Area } from "@/lib/routes/areas";
import { ID, Pre } from "@/lib/routes/types";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function AreaPage() {
  const areas = useAreas();
  const putArea = useRoutesStore((store) => store.putArea);

  const [modalArea, setModalArea] = useState<{ id: ID; area: Pre<Area> }>();
  const [areaModalOpen, { open: openAreaModal, close: closeAreaModal }] =
    useDisclosure(false);

  const saveArea = async (area: Pre<Area>) => {
    if (!modalArea) {
      throw new Error("modalArea not defined, could not get id");
    }
    await putArea({ ...area, id: modalArea.id });
    closeAreaModal();
  };

  const openEditAreaModal = (area: Area) => {
    setModalArea({ id: area.id, area: area });
    openAreaModal();
  };

  return (
    <>
      <Modal
        opened={!!areaModalOpen}
        onClose={closeAreaModal}
        title={modalArea?.id ? "Edit area" : "New area"}
      >
        <AreaForm area={modalArea?.area} onSubmit={saveArea} />
      </Modal>

      <AreasTable areas={areas} onAreaUpdate={openEditAreaModal} />
    </>
  );
}
