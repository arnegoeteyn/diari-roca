import SectorRows from "@/components/sector-rows";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAreas from "@/hooks/use-areas";
import { ID } from "@/lib/routes/types";
import { useState } from "react";

export default function Areas() {
  const [areas] = useAreas();
  const [openedArea, setOpenedArea] = useState<{ [key: ID]: boolean }>({});

  const onAreaClick = (id: ID) => {
    const current = openedArea[id] ?? false;
    setOpenedArea({ ...openedArea, [id]: !current });
  };

  return (
    <div>
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
