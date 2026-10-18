import { Loader, Stack } from "@mantine/core";
import { useMemo } from "react";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import {
  AreaOverview,
  getArea,
  ID,
  sectorsForAreaWithCount,
} from "@/lib/routes";
import { sectorOverviewsForArea } from "@/lib/cache";
import AddSectorButton from "../sectors/add-sector-button";

type Props = {
  areaId: ID;
};

export default function AreaActions(props: Props) {
  const createRouteWithAscent = useRoutesStore(
    (store) => store.createRouteWithAscent,
  );
  const addSector = useRoutesStore((store) => store.addSector);
  const store = useRoutesStore((store) => store.store);

  const sectors = useMemo(
    () => sectorOverviewsForArea(store.data, props.areaId),
    [store.data, props.areaId],
  );
  const area: AreaOverview = useMemo(
    () => ({
      ...getArea(store.data, props.areaId),
      sectors: sectorsForAreaWithCount(store.data, props.areaId),
    }),
    [store.data, props.areaId],
  );

  if (!area) {
    return <Loader />;
  }
  return (
    <Stack p={"16px"}>
      <AddSectorButton
        areas={[area]}
        onSectorCreated={(sector) => addSector(sector).then()}
      />
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r, a) => createRouteWithAscent(r, a).then()}
      />
    </Stack>
  );
}
