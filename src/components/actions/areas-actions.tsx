import { Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import AddAreaButton from "../areas/add-area-button";

export default function AreasActions() {
  const addRoute = useRoutesStore((store) => store.addRoute);
  const addArea = useRoutesStore((store) => store.addArea);
  const sectors = useSectorOverviews();

  return (
    <Stack p={"16px"}>
      <AddAreaButton onAreaCreated={(a) => addArea(a).then()} />
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r) => addRoute(r).then()}
      />
    </Stack>
  );
}
