import { Stack } from "@mantine/core";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import AddRouteButton from "../routes/add-route-button";
import { useCreateRoute } from "@/hooks/store/use-create-route";

export default function RoutesActions() {
  const { createRoute } = useCreateRoute();
  const sectors = useSectorOverviews();
  return (
    <Stack p={"16px"}>
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r, a) => createRoute(r, a).then()}
      />
    </Stack>
  );
}
