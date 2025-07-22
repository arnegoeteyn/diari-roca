import AreasTable from "@/components/areas/areas-table";
import { AreaForm } from "@/components/forms/area-form";
import { Button } from "@/components/ui/button";
import useAreas from "@/hooks/use-areas";
import useConfirmationDialog from "@/hooks/use-dialog";
import { addArea, putArea } from "@/lib/routes/areas";
import { Area, AreaOverview, ID, Pre } from "@/lib/routes/types";
import { useEffect, useState } from "react";

export default function Areas() {
  const { easyDialog } = useConfirmationDialog();

  const [areas, loading, refetch] = useAreas();
  const [openedAreas, setOpenedArea] = useState<{ [key: ID]: boolean }>({});

  const [areaToUpdate, setUpdatedArea] = useState<Pre<Area>>({} as Area);

  useEffect(() => console.log(areaToUpdate), [areaToUpdate]);

  const onAreaSelect = (area: AreaOverview) => {
    if (area.sectors.length == 0) {
      return;
    }
    const id = area.area.id;
    const current = openedAreas[id] ?? false;
    setOpenedArea({ ...openedAreas, [id]: !current });
  };

  const openEditAreaDialog = async (area?: Area) => {
    const update = !!area;

    if (update) {
      setUpdatedArea({ ...area });
    } else {
      setUpdatedArea({} as Area);
    }

    // let result: Pre<Area> = {} as Pre<Area>;
    // const onSubmit = (area: Pre<Area>) => (result = area);

    const title = update ? "Update area" : "New Area";
    const success = await easyDialog({
      title,
      dialogForm: ({ onSubmit }) => (
        <AreaForm area={areaToUpdate} onSubmit={onSubmit} />
      ),
    });

    console.log("success", success);

    if (success) {
      if (update) {
        putArea({ ...areaToUpdate, id: area.id }).then(refetch);
      } else {
        addArea(areaToUpdate).then(refetch);
      }
    }
  };

  return loading ? (
    <p>loading</p>
  ) : (
    <div>
      <div className="flex [&>*]:mx-4">
        <h2>{areas.length} areas</h2>
        <Button onClick={() => openEditAreaDialog()}>Add new</Button>
      </div>
      <AreasTable
        areas={areas}
        openedAreas={openedAreas}
        onAreaSelect={onAreaSelect}
        onAreaUpdate={(area: Area) => openEditAreaDialog(area)}
      />
    </div>
  );
}
