import { Ascent, AscentOverview, Trip } from "@/lib/routes/types";
import {
  Anchor,
  DefaultMantineColor,
  MantineStyleProp,
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

const styleForAscent = (
  trips: Trip[],
  ascent: Ascent,
  first?: boolean,
  last?: boolean
): MantineStyleProp => {
  const trip = tripForAscent(trips, ascent);
  if (!trip) {
    return;
  }
  return {
    borderBottomLeftRadius: last ? "10px" : "",
    borderBottomRightRadius: last ? "10px" : "",
    borderTopLeftRadius: first ? "10px" : "",
    borderTopRightRadius: first ? "10px" : "",
    backgroundColor: `var(--mantine-color-${colorForTrip(trip)}-4)`,
  };
};

const colorForTrip = (trip?: Trip) =>
  trip ? TRIP_COLORS[trip.id % TRIP_COLORS.length] : undefined;

const tripForAscent = (trips: Trip[], ascent: Ascent): Trip | undefined => {
  for (const trip of trips) {
    if (ascentInTrip(trip, ascent)) {
      return trip;
    }
  }
  return;
};

const ascentInTrip = (trip: Trip, ascent: Ascent): boolean => {
  return trip.from <= ascent.date && trip.to >= ascent.date;
};

const isEdgeOfTrip = (trip: Trip, edge?: Ascent): boolean => {
  if (!edge) {
    return true;
  }

  return !ascentInTrip(trip, edge);
};

type AscentRowProps = {
  ascent: AscentOverview;
  trips: Trip[];
  prev?: Ascent;
  next?: Ascent;
};
function AscentRow(props: AscentRowProps) {
  const { ascent, trips, prev, next } = props;
  const trip = tripForAscent(trips, ascent.ascent);

  const first = trip && isEdgeOfTrip(trip, prev);
  const last = trip && isEdgeOfTrip(trip, next);

  return (
    <Table.Tr key={ascent.ascent.id} className={trip ? "linked-row" : ""}>
      <Table.Td
        style={styleForAscent(props.trips, ascent.ascent, first, last)}
      ></Table.Td>
      <Table.Td align="left" className="font-medium">
        <Text>{ascent.ascent.date}</Text>
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
  );
}

export default function AscentsOverviewTable(props: Props) {
  const [page, setPage] = useState<number>(0);

  const shownAscents = () => {
    return props.ascents.slice(
      page * ASCENTS_PER_PAGE,
      (page + 1) * ASCENTS_PER_PAGE
    );
  };

  console.log(shownAscents());

  return (
    <Stack>
      <Table withRowBorders={false} striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: 8 }} />
            <Table.Th>Date</Table.Th>
            <Table.Th>Route</Table.Th>
            <Table.Th>Area</Table.Th>
            <Table.Th>Kind</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {shownAscents().map((ascent, i) => (
            <AscentRow
              key={ascent.ascent.id}
              ascent={ascent}
              trips={props.trips}
              prev={props.ascents[ASCENTS_PER_PAGE * page + i - 1]?.ascent}
              next={props.ascents[ASCENTS_PER_PAGE * page + i + 1]?.ascent}
            />
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
