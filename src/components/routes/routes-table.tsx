import { Ascent, RouteOverview } from "@/lib/routes/types";
import { Edit, Trash, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Group, Pagination, Table } from "@mantine/core";
import { useState } from "react";
import RouteActions from "./route-actions";
import { RouteContextProvider } from "@/contexts/route-context";
import AscentBadge from "../ascents/ascent-badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsMedium } from "@/hooks/use-medium";

type Props = {
  routes: RouteOverview[];
  showKind?: boolean;
};

const ROUTES_PER_PAGE = 25;

export default function RouteTable(props: Props) {
  const [page, setPage] = useState<number>(0);
  const isMobile = useIsMedium();

  const shownRoutes = () => {
    return props.routes.slice(
      page * ROUTES_PER_PAGE,
      (page + 1) * ROUTES_PER_PAGE
    );
  };

  const ascentBadge = (ascents: Ascent[]): React.ReactElement => {
    if (ascents.length == 0) {
      return <></>;
    }
    const sorted = ascents.sort((a, b) => a.date.localeCompare(b.date));
    return <AscentBadge compact={isMobile} ascent={sorted[0]} />;
  };

  return (
    <>
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
          {shownRoutes().map((route) => (
            <Table.Tr key={route.route.id}>
              <Table.Td align="left" className="font-medium">
                {route.route.grade}
              </Table.Td>
              <Table.Td>{route.route.name}</Table.Td>
              {props.showKind && <Table.Td>{route.route.kind}</Table.Td>}
              <Table.Td>
                <Group>
                  {route.ascents.length}
                  {ascentBadge(route.ascents)}
                </Group>
              </Table.Td>
              <Table.Td>
                <RouteContextProvider routeId={route.route.id.toString()}>
                  <RouteActions compact />
                </RouteContextProvider>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Pagination
        value={page + 1}
        onChange={(p) => setPage(p - 1)}
        total={Math.ceil(props.routes.length / ROUTES_PER_PAGE)}
      />
    </>
  );
}
