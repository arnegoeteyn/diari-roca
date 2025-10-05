import { Ascent } from "@/lib/routes";
import { Text, Group, Box, Stack, Button } from "@mantine/core";
import { Edit, Trash2 } from "lucide-react";
import AscentBadge from "./ascent-badge";

type Props = {
  ascents: Ascent[];
};

export default function AscentsList({ ascents }: Props) {
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
                onClick={console.log}
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
