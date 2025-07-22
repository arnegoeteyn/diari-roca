import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RouteForm from "./route-form";
import { SectorOverview } from "@/lib/routes/types";

type Props = {
  sectors: SectorOverview[];
};

export default function AddRouteButton(props: Props) {
  const [routeOpened, { open: routeOpen, close: routeClose }] =
    useDisclosure(false);

  const { sectors } = props;

  return (
    <>
      <Modal
        opened={routeOpened}
        onClose={() => routeClose()}
        title="New route"
      >
        <RouteForm
          sectors={sectors.map((sector) => sector.sector)}
          onSubmit={(update) => {
            console.log(update);
            // updateRoute({ ...update, id: route.id }).then(routeClose);
          }}
        />
      </Modal>
      <Button onClick={routeOpen}>New route</Button>
    </>
  );
}
