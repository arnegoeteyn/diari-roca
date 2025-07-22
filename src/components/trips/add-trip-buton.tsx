import { Button, Modal } from "@mantine/core";
import TripForm from "./trip-form";
import { useDisclosure } from "@mantine/hooks";

type Props = {};
export default function AddTripButton(props: Props) {
  const [tripOpened, { open: tripOpen, close: tripClose }] =
    useDisclosure(false);
  return (
    <>
      <Modal opened={tripOpened} onClose={tripClose} title="New trip">
        <TripForm />
      </Modal>
      <Button onClick={tripOpen}>New trip</Button>
    </>
  );
}
