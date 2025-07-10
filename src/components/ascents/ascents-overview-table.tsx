import { Ascent, AscentOverview, ID, Trip } from "@/lib/routes/types";
import {
  Anchor,
  DefaultMantineColor,
  Pagination,
  Stack,
  StyleProp,
  Table,
  Text,
} from "@mantine/core";
import { useState } from "react";
import AscentBadge from "../ascents/ascent-badge";
import RouteBreadcrumbs from "../routes/route-breadcrumbs";
import { Link } from "react-router-dom";

type Props = {
  ascents: AscentOverview[];
  trips: Trip[];
};

const ASCENTS_PER_PAGE = 25;

const TRIP_COLORS: StyleProp<DefaultMantineColor>[] = [
  "yellow",
  "blue",
  "cyan",
  "grape",
  "pink",
];

const colorForTrip = (trip?: Trip) =>
  trip ? TRIP_COLORS[trip.id % TRIP_COLORS.length] : undefined;

const tripForAscent = (trips: Trip[], ascent: Ascent): Trip | undefined => {
  for (const trip of trips) {
    if (trip.from <= ascent.date && trip.to >= ascent.date) {
      return trip;
    }
  }
  return;
};

export default function AscentsOverviewTable(props: Props) {
  const [page, setPage] = useState<number>(0);

  if (props.ascents.length > 0) {
    console.log(props.ascents[0]);
    console.log(props.ascents);
    const a = props.ascents[0];

    console.log(a);
    console.log(tripForAscent(props.trips, a.ascent));
  }

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
                <Text
                  c={colorForTrip(tripForAscent(props.trips, ascent.ascent))}
                >
                  {ascent.ascent.date}
                </Text>
              </Table.Td>
              <Table.Td>
                <Anchor component={Link} to={`/routes/${ascent.route.id}`}>
                  {`${ascent.route.name} (${ascent.route.grade})`}
                </Anchor>
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
