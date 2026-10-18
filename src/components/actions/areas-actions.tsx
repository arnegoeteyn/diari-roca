import { Stack } from "@mantine/core";
import { useMemo } from "react";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import { getSectorOverviews } from "@/lib/cache";
import AddAreaButton from "../areas/add-area-button";

export default function AreasActions() {
  const createRouteWithAscent = useRoutesStore(
    (store) => store.createRouteWithAscent,
  );
  const addArea = useRoutesStore((store) => store.addArea);
  const store = useRoutesStore((store) => store.store);
  const sectors = useMemo(() => getSectorOverviews(store.data), [store.data]);

  return (
    <Stack p={"16px"}>
      <AddAreaButton onAreaCreated={(a) => addArea(a).then()} />
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r, a) => createRouteWithAscent(r, a).then()}
      />
    </Stack>
  );
}
