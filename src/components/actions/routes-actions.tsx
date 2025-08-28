import { Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import AddRouteButton from "../routes/add-route-button";

export default function RoutesActions() {
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
