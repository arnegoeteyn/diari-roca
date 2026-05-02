import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import RouteForm from "@/components/routes/route-form/route-form.tsx";
import { AscentKind, Pre, Route } from "@/lib/routes";
import { SectorOverview } from "@/lib/cache";

type Props = {
  initialRoute?: Route;
  sectors: SectorOverview[];
  onRouteCreated: (route: Pre<Route>, ascent?: AscentKind) => Promise<void>;
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
          onSubmit={(r, a) => onRouteCreated(r, a).then(routeClose)}
        />
      </Modal>
      <Button onClick={routeOpen}>New route</Button>
    </>
  );
}
