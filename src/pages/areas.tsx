import { AreaDialog } from "@/components/dialogs/area-dialog";
import SectorRows from "@/components/sector-rows";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAreas from "@/hooks/use-areas";
import { addArea, putArea } from "@/lib/routes/areas";
import { Area, AreaOverview, ID, Pre } from "@/lib/routes/types";
import { ArrowRight, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Areas() {
  const [areas, loading, refetch] = useAreas();
  const [openedArea, setOpenedArea] = useState<{ [key: ID]: boolean }>({});

  const [openAreaDialog, setOpenedAreaDialog] = useState(false);

  const [areaToUpdate, setAreaToUpdate] = useState<Area | undefined>();

  const onAreaSelect = (area: AreaOverview) => {
    if (area.sectors.length == 0) {
      return;
    }
    const id = area.area.id;
    const current = openedArea[id] ?? false;
    setOpenedArea({ ...openedArea, [id]: !current });
  };

  const onAreaUpdate = (area: Area) => {
    setAreaToUpdate(area);
    setOpenedAreaDialog(true);
  };

  const onCreateArea = (area: Pre<Area>) => {
    addArea(area)
      .then(refetch)
      .then(() => setOpenedAreaDialog(false));
  };

  const onUpdateArea = (area: Area) => {
    console.log(area);
    putArea(area)
      .then(refetch)
      .then(() => {
        setOpenedAreaDialog(false);
        setAreaToUpdate(undefined);
      });
  };

  return loading ? (
    <p>loading</p>
  ) : (
    <div>
      <div className="flex [&>*]:mx-4">
        <h2>{areas.length} areas</h2>
        <Button onClick={() => setOpenedAreaDialog(true)}>Add new</Button>
      </div>
      <AreaDialog
        open={openAreaDialog}
        initialArea={areaToUpdate}
        onSubmit={onCreateArea}
        onUpdate={onUpdateArea}
        onCancel={() => setOpenedAreaDialog(false)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Country</TableHead>
            <TableHead className="text-right"># sectors</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((overview) => (
            <>
              <TableRow onClick={() => onAreaSelect(overview)}>
                <TableCell className="text-left">
                  {overview.area.name}
                </TableCell>
                <TableCell>{overview.area.country}</TableCell>
                <TableCell>{overview.sectors.length}</TableCell>

                <TableCell>
                  <div className="space-x-2">
                    <Button onClick={() => onAreaUpdate(overview.area)}>
                      <Edit />
                    </Button>
                    <Button>
                      <Trash />
                    </Button>
                    <Link
                      to={`/areas/${overview.area.id}`}
                      className={buttonVariants()}
                    >
                      <ArrowRight />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
              {openedArea[overview.area.id] && (
                <SectorRows sectors={overview.sectors} />
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
