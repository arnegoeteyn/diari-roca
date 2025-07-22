import { Link } from "react-router-dom";
import { AreaOverview, ID } from "@/lib/routes/types";
import { Button, Group, Table } from "@mantine/core";
import SectorTable from "./sector-table";
import { IconArrowRight, IconEdit, IconTrash } from "@tabler/icons-react";

type Props = {
  areas: AreaOverview[];
  openedAreas: { [key: ID]: boolean };

  onAreaSelect: (area: AreaOverview) => void;
  onAreaUpdate: (area: Area) => void;
  // onCreateSector: () => void;
};
export default function AreasTable(props: Props) {
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Country</Table.Th>
          <Table.Th># sectors</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.areas.map((overview) => (
          <>
            <Table.Tr onClick={() => props.onAreaSelect(overview)}>
              <Table.Td>{overview.area.name}</Table.Td>
              <Table.Td>{overview.area.country}</Table.Td>
              <Table.Td>{overview.sectors.length}</Table.Td>

              <Table.Td>
                <div className="space-x-2">
                  <Group gap={"md"}>
                    <Button onClick={() => props.onAreaUpdate(overview.area)}>
                      <IconEdit />
                    </Button>
                    <Button>
                      <IconTrash />
                    </Button>
                    <Link to={`/areas/${overview.area.id}`}>
                      <Button>
                        <IconArrowRight />
                      </Button>
                    </Link>
                  </Group>
                </div>
              </Table.Td>
            </Table.Tr>

            {props.openedAreas[overview.area.id] && (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  <SectorTable
                    sectors={overview.sectors}
                    onCreateSector={props.onCreateSector}
                  />
                </Table.Td>
              </Table.Tr>
            )}
          </>
        ))}
      </Table.Tbody>
    </Table>
  );
}
