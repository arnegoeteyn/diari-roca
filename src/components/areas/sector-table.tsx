import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SectorWithRouteCount } from "@/lib/routes/sectors";
import { Button } from "../ui/button";

type Props = {
  sectors: SectorWithRouteCount[];
};
export default function SectorTable(props: Props) {
  const sorted = props.sectors.sort((a, b) =>
    a.sector.name < b.sector.name ? -1 : 1
  );
  return (
    <>
      <Button>New sector</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sector name</TableHead>
            <TableHead># routes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((sector) => (
            <TableRow key={sector.sector.id}>
              <TableCell className="px-4">{sector.sector.name}</TableCell>
              <TableCell>{sector.routeCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
