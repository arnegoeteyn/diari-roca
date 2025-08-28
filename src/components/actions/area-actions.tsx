import { Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import useSectors from "@/hooks/store/use-sectors";
import AddRouteButton from "../routes/add-route-button";

export default function AreaActions() {
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
