import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import useAreas from "@/hooks/use-areas";

export default function Areas() {
  const [areas] = useAreas();
  return (
    <div>
      <Table>
        {areas.map((overview) => (
          <TableRow key={overview.area.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="beta">
                <TableCell>{overview.area.name}</TableCell>
                <TableCell>
                  <AccordionTrigger>Click</AccordionTrigger>
                </TableCell>
                <AccordionContent>
                  <ul>
                    {overview.sectors.map((sector) => (
                      <li key={sector.id}>{sector.name}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
