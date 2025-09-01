import { SectorWithRouteCountOld } from "@/lib/routes/sectors";
import { Button, Table } from "@mantine/core";

type Props = {
  sectors: SectorWithRouteCountOld[];
  onCreateSector: () => void;
};
export default function SectorTable(props: Props) {
  const sorted = props.sectors.sort((a, b) =>
    a.sector.name < b.sector.name ? -1 : 1,
  );
  return (
    <>
      <Button onClick={props.onCreateSector}>New sector</Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sector name</Table.Th>
            <Table.Th># routes</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.sectors.length > 0 ? (
            sorted.map((sector) => (
              <Table.Tr key={sector.sector.id}>
                <Table.Td className="px-4">{sector.sector.name}</Table.Td>
                <Table.Td>{sector.routeCount}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td>
                <p>This area does not yet have any sectors</p>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </>
  );
}
