import { Container, Title, Text } from "@mantine/core";
import useSettings from "./hook";

export default function Settings() {
  const store = useSettings();
  return (
    <Container>
      <Title order={2}>Your current session has</Title>
      <Text>{`${store.areas.size} areas`}</Text>
      <Text>{`${store.sectors.size} sectors`}</Text>
      <Text>{`${store.routes.size} routes`}</Text>
      <Text>{`${store.ascents.size} ascents`}</Text>
      <Text>{`${store.trips.size} trips`}</Text>
    </Container>
  );
}
