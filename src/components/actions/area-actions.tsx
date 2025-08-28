import { Loader, Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import AddRouteButton from "../routes/add-route-button";
import useSectorOverviews from "@/hooks/store/use-sector-overviews";
import { ID } from "@/lib/routes";

type Props = {
  areaId: ID;
};

export default function AreaActions(props: Props) {
  const addRoute = useRoutesStore((store) => store.addRoute);
  const sectors = useSectorOverviews({ areaId: props.areaId });

  if (!sectors) {
    return <Loader />;
  }
  return (
    <Stack p={"16px"}>
      <AddRouteButton
        sectors={sectors}
        onRouteCreated={(r) => addRoute(r).then()}
      />
    </Stack>
  );
}
