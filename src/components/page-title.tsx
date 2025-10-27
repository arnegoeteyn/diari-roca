import { Group, Title } from "@mantine/core";

type Props = {
  title: string;
  subtitle?: string;
};
export default function PageTitle(props: Props) {
  return (
    <Group>
      <Title>{props.title}</Title>
      <Title c={"gray"} order={2}>
        [{props.subtitle}]
      </Title>
    </Group>
  );
}
