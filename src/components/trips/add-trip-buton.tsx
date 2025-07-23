import { Button, Modal } from "@mantine/core";
import TripForm from "./trip-form";
import { useDisclosure } from "@mantine/hooks";
import { Pre, Trip } from "@/lib/routes/types";

type Props = {
  onTripCreated: (trip: Pre<Trip>) => Promise<void>;
};
export default function AddTripButton(props: Props) {
  const [tripOpened, { open: tripOpen, close: tripClose }] =
    useDisclosure(false);
  return (
    <>
      <Modal opened={tripOpened} onClose={tripClose} title="New trip">
        <TripForm onSubmit={(t) => props.onTripCreated(t).then(tripClose)} />
      </Modal>
      <Button onClick={tripOpen}>New trip</Button>
    </>
  );
}
