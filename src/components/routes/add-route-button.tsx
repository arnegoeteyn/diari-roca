import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RouteForm from "./route-form";
import { Pre, Route, SectorOverview } from "@/lib/routes/types";

type Props = {
  sectors: SectorOverview[];
  onRouteCreated: (route: Pre<Route>) => Promise<void>;
};

export default function AddRouteButton(props: Props) {
  const [routeOpened, { open: routeOpen, close: routeClose }] =
    useDisclosure(false);

  const { sectors, onRouteCreated } = props;

  return (
    <>
      <Modal
        opened={routeOpened}
        onClose={() => routeClose()}
        title="New route"
      >
        <RouteForm
          sectors={sectors.map((sector) => sector.sector)}
          onSubmit={(r) => onRouteCreated(r).then(routeClose)}
        />
      </Modal>
      <Button onClick={routeOpen}>New route</Button>
    </>
  );
}
