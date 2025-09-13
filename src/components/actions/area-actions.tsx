import { Loader, Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import { ID } from "@/lib/routes";
import useAreaOverview from "@/hooks/store/use-area-overview";
import AddSectorButton from "../sectors/add-sector-button";

type Props = {
  areaId: ID;
};

export default function AreaActions(props: Props) {
  const addRoute = useRoutesStore((store) => store.addRoute);
  const addSector = useRoutesStore((store) => store.addSector);
  const sectors = useSectorOverviews({ areaId: props.areaId });
  const area = useAreaOverview(props.areaId);

  if (!sectors || !area) {
    return <Loader />;
  }
  return (
    <Stack p={"16px"}>
      <AddSectorButton
        areas={[area.area]}
        onSectorCreated={(sector) => addSector(sector).then()}
      />
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r) => addRoute(r).then()}
      />
    </Stack>
  );
}
