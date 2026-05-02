import { Stack } from "@mantine/core";
import AddRouteButton from "../routes/add-route-button";
import { ID, Route } from "@/lib/routes";
import useSector from "@/hooks/store/use-sector-overview";
import { Loader } from "lucide-react";
import { useCreateRoute } from "@/hooks/store/use-create-route";

type Props = {
  sectorId: ID;
};

export default function SectorsActions(props: Props) {
  const { createRoute } = useCreateRoute();
  const sector = useSector(props.sectorId);

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
        onRouteCreated={(r) => createRoute(r).then()}
      />
    </Stack>
  );
}
