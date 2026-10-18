import { Stack } from "@mantine/core";
import { useMemo } from "react";
import AddRouteButton from "../routes/add-route-button";
import { ID, Route } from "@/lib/routes";
import { useRoutesStore } from "@/hooks/store/use-store";
import { getSectorOverview } from "@/lib/cache";
import { Loader } from "lucide-react";

type Props = {
  sectorId: ID;
};

export default function SectorsActions(props: Props) {
  const createRouteWithAscent = useRoutesStore(
    (store) => store.createRouteWithAscent,
  );
  const store = useRoutesStore((store) => store.store);

  const sector = useMemo(
    () =>
      store.initialized
        ? getSectorOverview(store.data, props.sectorId)
        : undefined,
    [store.initialized, store.data, props.sectorId],
  );

  if (!sector) {
    return <Loader />;
  }

  const initialRoute = {
    sectorId: props.sectorId,
  } as Route;

  return (
    <Stack p={"16px"}>
      <AddRouteButton
        initialRoute={initialRoute}
        sectors={[sector]}
        onRouteCreated={(r, a) => createRouteWithAscent(r, a).then()}
      />
    </Stack>
  );
}
