import { AscentOverview } from "@/lib/routes/types";
import { Pagination, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import AscentBadge from "../ascents/ascent-badge";
import RouteBreadcrumbs from "../routes/route-breadcrumbs";

type Props = {
  ascents: AscentOverview[];
};

const ASCENTS_PER_PAGE = 25;

export default function AscentsOverviewTable(props: Props) {
  const [page, setPage] = useState<number>(0);

  const shownAscents = () => {
    return props.ascents.slice(
      page * ASCENTS_PER_PAGE,
      (page + 1) * ASCENTS_PER_PAGE
    );
  };

  return (
    <Stack>
      <Table stickyHeader stickyHeaderOffset={60} striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Route</Table.Th>
            <Table.Th>Area</Table.Th>
            <Table.Th>Kind</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {shownAscents().map((ascent) => (
            <Table.Tr key={ascent.ascent.id}>
              <Table.Td align="left" className="font-medium">
                <Text>{ascent.ascent.date}</Text>
              </Table.Td>
              <Table.Td>
                <Text>{`${ascent.route.name} (${ascent.route.grade})`}</Text>
              </Table.Td>
              <Table.Td>
                <RouteBreadcrumbs area={ascent.area} sector={ascent.sector} />
              </Table.Td>
              <Table.Td>
                <AscentBadge ascent={ascent.ascent} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Pagination
        value={page + 1}
        onChange={(p) => setPage(p - 1)}
        total={Math.ceil(props.ascents.length / ASCENTS_PER_PAGE)}
      />
    </Stack>
  );
}
