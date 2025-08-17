import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pre, Route, SectorOverview } from "@/lib/routes/types";

import RouteForm from "@/components/routes/route-form/route-form.tsx";

type Props = {
  initialRoute?: Route;
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
          sectors={sectors}
          onSubmit={(r) => onRouteCreated(r).then(routeClose)}
        />
      </Modal>
      <Button onClick={routeOpen}>New route</Button>
    </>
  );
}
