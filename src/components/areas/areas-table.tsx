import { Edit, Trash, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import SectorTable from "./sector-table";
import { Area, AreaOverview, ID } from "@/lib/routes/types";

type Props = {
  areas: AreaOverview[];
  openedAreas: { [key: ID]: boolean };

  onAreaSelect: (area: AreaOverview) => void;
  onAreaUpdate: (area: Area) => void;
};
export default function AreasTable(props: Props) {
  return (
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
        {props.areas.map((overview) => (
          <>
            <TableRow onClick={() => props.onAreaSelect(overview)}>
              <TableCell className="text-left">{overview.area.name}</TableCell>
              <TableCell>{overview.area.country}</TableCell>
              <TableCell>{overview.sectors.length}</TableCell>

              <TableCell>
                <div className="space-x-2">
                  <Button onClick={() => props.onAreaUpdate(overview.area)}>
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

            {props.openedAreas[overview.area.id] && (
              <TableRow>
                <TableCell colSpan={3}>
                  <SectorTable sectors={overview.sectors} />
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
