import { Ascent, AscentKind } from "@/lib/routes/types";
import { Text, Group, Badge, Box, Stack, Button } from "@mantine/core";
import {
  ArrowUp,
  CornerRightUp,
  Edit,
  Eye,
  Repeat,
  Trash2,
  Zap,
} from "lucide-react";

type Props = {
  ascents: Ascent[];
};

const kindToBadge = {
  [AscentKind.Onsight]: {
    color: "green",
    icon: <Eye size="1rem" />,
    label: "Onsight",
  },
  [AscentKind.Flash]: {
    color: "yellow",
    icon: <Zap size="1rem" />,
    label: "Onsight",
  },
  [AscentKind.Repeat]: {
    color: "blue",
    icon: <Repeat size="1rem" />,
    label: "Repeat",
  },
  [AscentKind.SecondGo]: {
    color: "cyan",
    icon: <CornerRightUp size="1rem" />,
    label: "Second Go",
  },
  [AscentKind.Redpoint]: {
    color: "red",
    icon: <ArrowUp size="1rem" />,
    label: "Redpoint",
  },
};

export default function RouteAscents({ ascents }: Props) {
  const sorted = ascents.sort((a, b) => -a.date.localeCompare(b.date));
  return (
    <Stack>
      {sorted.map((ascent) => (
        <Box key={ascent.id} mr={64}>
          <Group>
            <Group style={{ width: "300px" }}>
              <Text>{ascent.date}</Text>
              <Badge
                leftSection={kindToBadge[ascent.kind].icon}
                color={kindToBadge[ascent.kind].color}
                variant="light"
              >
                {kindToBadge[ascent.kind].label}
              </Badge>
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
