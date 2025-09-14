import { Loader, Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import {
  AreaOverview,
  getArea,
  ID,
  sectorsForAreaWithCount,
} from "@/lib/routes";
import AddSectorButton from "../sectors/add-sector-button";

type Props = {
  areaId: ID;
};

type AreaContent = AreaOverview;

function useArea(areaId: ID): AreaContent {
  const store = useRoutesStore((store) => store.store);
  const area: AreaContent = {
    ...getArea(store.data, areaId),
    sectors: sectorsForAreaWithCount(store.data, areaId),
  };

  return area;
}

export default function AreaActions(props: Props) {
  const addRoute = useRoutesStore((store) => store.addRoute);
  const addSector = useRoutesStore((store) => store.addSector);
  const sectors = useSectorOverviews({ areaId: props.areaId });
  const area = useArea(props.areaId);

  if (!sectors || !area) {
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
        onRouteCreated={(r) => addRoute(r).then()}
      />
    </Stack>
  );
}
