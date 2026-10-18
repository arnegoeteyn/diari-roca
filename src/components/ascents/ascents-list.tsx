import { Ascent, ID } from "@/lib/routes";
import { Text, Group, Box, Stack, Button, Modal } from "@mantine/core";
import { Edit, Trash2 } from "lucide-react";
import AscentBadge from "./ascent-badge";
import AscentForm from "@/components/ascents/ascent-form";
import { modals } from "@mantine/modals";
import { useState } from "react";

type Props = {
  ascents: Ascent[];
  onDeleteAscent: (ascentId: ID) => void;
  onUpdateAscent: (ascent: Ascent) => void;
};

export default function AscentsList({
  ascents,
  onDeleteAscent,
  onUpdateAscent,
}: Props) {
  if (ascents.length == 0) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <Text c="dimmed">No ascents recorded yet.</Text>
      </Box>
    );
  }

  const [selectedAscent, setSelectedAscent] = useState<ID>();

  const onDeleteAscentConfirmation = (ascent: Ascent) => {
    modals.openConfirmModal({
      title: "Delete ascent?",
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => onDeleteAscent(ascent.id),
    });
  };

  const sorted = ascents.sort((a, b) => -a.date.localeCompare(b.date));
  return (
    <>
      <Modal
        opened={selectedAscent != undefined}
        title={`Edit ascent`}
        onClose={() => setSelectedAscent(undefined)}
      >
        <AscentForm
          onSubmit={(ascentBody) => {
            let ascent = ascents.find((a) => a.id == selectedAscent);
            if (ascent == undefined) {
              throw "could not find ascent";
            }
            ascent = { ...ascent, ...ascentBody };
            onUpdateAscent(ascent);

            setSelectedAscent(undefined);
          }}
          ascent={ascents.find((a) => a.id == selectedAscent)}
        />
      </Modal>
      <Stack>
        {sorted.map((ascent) => (
          <Box key={ascent.id} mr={64}>
            <Group>
              <Group style={{ width: "300px" }}>
                <Text>{ascent.date}</Text>
                <AscentBadge ascent={ascent} />
              </Group>
              <Group justify="start" gap={"xs"}>
                <Button
                  variant="subtle"
                  color="blue"
                  size="xs"
                  onClick={() => setSelectedAscent(ascent.id)}
                >
                  <Edit size="1rem" />
                </Button>
                <Button
                  variant="subtle"
                  color="red"
                  size="xs"
                  onClick={() => onDeleteAscentConfirmation(ascent)}
                >
                  <Trash2 size="1rem" />
                </Button>
              </Group>
            </Group>
            {ascent.comment && <Text c="dimmed">{ascent.comment}</Text>}
          </Box>
        ))}
      </Stack>
    </>
  );
}
