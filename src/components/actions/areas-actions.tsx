import { Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";

export default function AreasActions() {
  const addRoute = useRoutesStore((store) => store.addRoute);
  const sectors = useSectorOverviews();

  return (
    <Stack p={"16px"}>
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r) => addRoute(r).then()}
      />
    </Stack>
  );
}
