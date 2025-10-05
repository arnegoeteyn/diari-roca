import { Ascent, ID } from "@/lib/routes";
import { Text, Group, Box, Stack, Button } from "@mantine/core";
import { Edit, Trash2 } from "lucide-react";
import AscentBadge from "./ascent-badge";
import { modals } from "@mantine/modals";

type Props = {
  ascents: Ascent[];
  onDeleteAscent: (ascentId: ID) => void;
};

export default function AscentsList({ ascents, onDeleteAscent }: Props) {
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

  const onDeleteRouteConfirmation = (ascent: Ascent) => {
    modals.openConfirmModal({
      title: "Delete ascent?",
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => onDeleteAscent(ascent.id),
    });
  };

  const sorted = ascents.sort((a, b) => -a.date.localeCompare(b.date));
  return (
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
                onClick={console.log}
              >
                <Edit size="1rem" />
              </Button>
              <Button
                variant="subtle"
                color="red"
                size="xs"
                onClick={() => onDeleteRouteConfirmation(ascent)}
              >
                <Trash2 size="1rem" />
              </Button>
            </Group>
          </Group>
          {ascent.comment && <Text c="dimmed">{ascent.comment}</Text>}
        </Box>
      ))}
    </Stack>
  );
}
