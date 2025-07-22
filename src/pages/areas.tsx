import { AreaDialog } from "@/components/dialogs/area-dialog";
import SectorRows from "@/components/sector-rows";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAreas from "@/hooks/use-areas";
import { addArea } from "@/lib/routes/areas";
import { Area, ID, Pre } from "@/lib/routes/types";
import { useState } from "react";

export default function Areas() {
  const [areas, loading, refetch] = useAreas();
  const [openedArea, setOpenedArea] = useState<{ [key: ID]: boolean }>({});

  const [openAreaDialog, setOpenedAreaDialog] = useState(false);

  const onAreaClick = (id: ID) => {
    const current = openedArea[id] ?? false;
    setOpenedArea({ ...openedArea, [id]: !current });
  };

  const onSubmitArea = (area: Pre<Area>) => {
    addArea(area)
      .then(refetch)
      .then(() => setOpenedAreaDialog(false));
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
        onSubmit={onSubmitArea}
        onCancel={() => setOpenedAreaDialog(false)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Country</TableHead>
            <TableHead className="text-right"># sectors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((overview) => (
            <>
              <TableRow onClick={() => onAreaClick(overview.area.id)}>
                <TableCell className="text-left">
                  {overview.area.name}
                </TableCell>
                <TableCell>{overview.area.country}</TableCell>
                <TableCell>{overview.sectors.length}</TableCell>
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
