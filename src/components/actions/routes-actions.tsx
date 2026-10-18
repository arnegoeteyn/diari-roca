import { Stack } from "@mantine/core";
import { useMemo } from "react";
import AddRouteButton from "../routes/add-route-button";
import { useRoutesStore } from "@/hooks/store/use-store";
import { getSectorOverviews } from "@/lib/cache";

export default function RoutesActions() {
  const createRouteWithAscent = useRoutesStore(
    (store) => store.createRouteWithAscent,
  );
  const store = useRoutesStore((store) => store.store);
  const sectors = useMemo(() => getSectorOverviews(store.data), [store.data]);

  return (
    <Stack p={"16px"}>
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r, a) => createRouteWithAscent(r, a).then()}
      />
    </Stack>
  );
}
