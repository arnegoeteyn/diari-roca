import { Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/use-store";
import useSectors from "@/hooks/use-sectors";
import AddRouteButton from "../routes/add-route-button";

export default function RoutesActions() {
  const addRoute = useRoutesStore((store) => store.addRoute);
  const sectors = useSectors();
  return (
    <Stack p={"16px"}>
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r) => addRoute(r).then()}
      />
    </Stack>
  );
}
