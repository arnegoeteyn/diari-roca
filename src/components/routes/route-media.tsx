import { useRouteContext } from "@/contexts/route-context";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import MediaEmbed from "../media-embed";
import { Edit, Trash2 } from "lucide-react";

export default function RouteMedia() {
  const { route } = useRouteContext();
  if (route.media.length === 0) {
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

  return (
    <div>
      {route.media.map((link) => (
        <Stack style={{ width: 640 }}>
          <MediaEmbed label={link.label} url={link.link} />
          <Group justify="space-between">
            <Text c="dimmed">{link.label}</Text>
            <Group>
              <Button variant="subtle" size="xs">
                <Edit size="1rem" />
              </Button>
              <Button variant="subtle" size="xs" c="red">
                <Trash2 size="1rem" />
              </Button>
            </Group>
          </Group>
        </Stack>
      ))}
    </div>
  );
}
