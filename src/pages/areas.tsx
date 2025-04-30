import { AreaForm } from "@/components/areas/area-form";
import AreasTable from "@/components/areas/areas-table";
import useAreas from "@/hooks/use-areas";
import { addArea, putArea } from "@/lib/routes/areas";
import { Area, AreaOverview, ID, Pre } from "@/lib/routes/types";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Areas() {
  // const { easyDialog } = useConfirmationDialog();

  const [areas, loading, refetch] = useAreas();

  const [modalArea, setModalArea] = useState<{ id?: ID; area?: Pre<Area> }>();

  const [areaModalOpen, { open: openAreaModal, close: closeAreaModal }] =
    useDisclosure(false);

  const saveArea = async (area: Pre<Area>) => {
    if (modalArea?.id) {
      await putArea({ ...area, id: modalArea.id });
    } else {
      await addArea(area);
    }
    closeAreaModal();
    refetch();
  };

  const openNewAreaModal = () => {
    setModalArea({});
    openAreaModal();
  };

  const openEditAreaModal = (area: Area) => {
    setModalArea({ id: area.id, area: area });
    openAreaModal();
  };

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <Modal
        opened={!!areaModalOpen}
        onClose={closeAreaModal}
        title={modalArea?.id ? "Edit area" : "New area"}
      >
        <AreaForm area={modalArea?.area} onSubmit={saveArea} />
      </Modal>

      <div className="flex [&>*]:mx-4">
        <h2>{areas.length} areas</h2>
        <Button onClick={openNewAreaModal}>Add new</Button>
      </div>
      <AreasTable
        areas={areas}
        onAreaUpdate={openEditAreaModal}
        // onCreateSector={() => opeEditSectorDialog()}
      />
    </>
  );
}
