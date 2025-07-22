import { Sector } from "@/lib/routes/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { SectorWithRouteCount } from "@/lib/routes/sectors";

type Props = {
  sectors: SectorWithRouteCount[];
};
export default function SectorRows(props: Props) {
  return (
    <TableRow>
      <TableCell colSpan={3}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sector name</TableHead>
              <TableHead># routes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.sectors.map((sector) => (
              <TableRow key={sector.sector.id}>
                <TableCell className="px-4">{sector.sector.name}</TableCell>
                <TableCell>{sector.routeCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
}
