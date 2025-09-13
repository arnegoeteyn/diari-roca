import { Link } from "react-router-dom";
import { Area, AreaOverview, ID } from "@/lib/routes";
import { Button, Group, Table } from "@mantine/core";
import { IconArrowRight, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  areas: AreaOverview[];
  onAreaUpdate: (area: Area) => void;
};

export default function AreasTable(props: Props) {
  const [openedAreas, setOpenedArea] = useState<{ [key: ID]: boolean }>({});

  const onAreaSelect = (area: AreaOverview) => {
    const id = area.area.id;
    const current = openedAreas[id] ?? false;
    setOpenedArea({ ...openedAreas, [id]: !current });
  };

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
            <Table.Tr onClick={() => onAreaSelect(overview)}>
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
          </>
        ))}
      </Table.Tbody>
    </Table>
  );
}
