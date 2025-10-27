import { useRoutesStore } from "@/hooks/store/use-store";
import { ID } from "@/lib/routes";
import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Trash } from "lucide-react";

type Props = {
  sectorId: ID;
};
export default function DeleteSectorButton(props: Props) {
  const deleteSector = useRoutesStore((store) => store.deleteSector);

  const onDeleteSectorConfirmation = () => {
    modals.openConfirmModal({
      title: "Delete sector?",
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteSector(props.sectorId),
    });
  };

  return (
    <Button
      leftSection={<Trash />}
      onClick={onDeleteSectorConfirmation}
      color={"red"}
    >
      Delete
    </Button>
  );
}
