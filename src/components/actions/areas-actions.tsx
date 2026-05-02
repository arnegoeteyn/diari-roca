import { Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import AddAreaButton from "../areas/add-area-button";
import { useCreateRoute } from "@/hooks/store/use-create-route";

export default function AreasActions() {
  const { createRoute } = useCreateRoute();
  const addArea = useRoutesStore((store) => store.addArea);
  const sectors = useSectorOverviews();

  return (
    <Stack p={"16px"}>
      <AddAreaButton onAreaCreated={(a) => addArea(a).then()} />
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r) => createRoute(r).then()}
      />
    </Stack>
  );
}
