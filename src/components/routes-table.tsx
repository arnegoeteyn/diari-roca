import { RouteOverview } from "@/lib/routes/types";
import { Edit, Trash, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Group, Table } from "@mantine/core";

type Props = {
  routes: RouteOverview[];
  showKind?: boolean;
};

export default function RouteTable(props: Props) {
  return (
    <Table stickyHeader stickyHeaderOffset={60} striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Grade</Table.Th>
          <Table.Th>Name</Table.Th>
          {props.showKind && <Table.Th>Kind</Table.Th>}
          <Table.Th>Ascents</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.routes.map((route) => (
          <Table.Tr key={route.route.id}>
            <Table.Td align="left" className="font-medium">
              {route.route.grade}
            </Table.Td>
            <Table.Td>{route.route.name}</Table.Td>
            {props.showKind && <Table.Td>{route.route.kind}</Table.Td>}
            <Table.Td>{route.ascents.length}</Table.Td>
            <Table.Td>
              <Group gap={"md"}>
                <Button>
                  <Edit />
                </Button>
                <Button>
                  <Trash />
                </Button>
                <Link to={`/routes/${route.route.id}`}>
                  <Button>
                    <ArrowRight />
                  </Button>
                </Link>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
