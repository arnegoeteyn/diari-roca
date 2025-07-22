import { AreaForm } from "@/components/areas/area-form";
import AreasTable from "@/components/areas/areas-table";
import { SectorForm } from "@/components/areas/sector-form";
import useAreas from "@/hooks/use-areas";
import { addArea, putArea } from "@/lib/routes/areas";
import { addSector } from "@/lib/routes/sectors";
import { Area, ID, Pre, Sector } from "@/lib/routes/types";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Area() {
  const [areas, loading, refetch] = useAreas();

  const [modalArea, setModalArea] = useState<{ id?: ID; area?: Pre<Area> }>();
  const [areaModalOpen, { open: openAreaModal, close: closeAreaModal }] =
    useDisclosure(false);

  const [modalSector, setModalSector] = useState<{
    id?: ID;
    fixedAreaId?: ID;
    sector?: Pre<Sector>;
  }>();
  const [sectorModalOpen, { open: openSectorModal, close: closeSectorModal }] =
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

  const saveSector = async (sector: Pre<Sector>) => {
    console.log(sector);
    if (modalSector?.id) {
      await putSector({ ...sector, id: modalSector.id });
    } else {
      await addSector(sector);
    }
    closeSectorModal();
    refetch();
  };

  const openNewSectorModal = (areaId: number) => {
    setModalSector({ fixedAreaId: areaId });
    openSectorModal();
  };

  const openEditSectorModal = (sector: Sector) => {
    setModalSector({ id: sector.id, sector });
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

      <Modal
        opened={!!sectorModalOpen}
        onClose={closeSectorModal}
        title={modalArea?.id ? "Edit sector" : "New sector"}
      >
        <SectorForm
          sector={modalSector?.sector}
          areas={areas.map((a) => a.area)}
          onSubmit={saveSector}
          fixedAreaId={modalSector?.fixedAreaId}
        />
      </Modal>

      <div className="flex [&>*]:mx-4">
        <h2>{areas.length} areas</h2>
        <Button onClick={openNewAreaModal}>Add new</Button>
      </div>
      <AreasTable
        areas={areas}
        onAreaUpdate={openEditAreaModal}
        onCreateSector={openNewSectorModal}
      />
    </>
  );
}
