import { Group, Title } from "@mantine/core";

type Props = {
  title: string;
  subtitle?: string;
};
export function PageTitle(props: Props) {
  return (
    <Group justify={"start"} align={"center"} mb={32}>
      <Title>{props.title}</Title>
      <Title c={"gray"} order={2}>
        [{props.subtitle}]
      </Title>
    </Group>
  );
}
