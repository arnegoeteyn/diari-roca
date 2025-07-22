import { Ascent } from "@/lib/routes/types";
import { List } from "@mantine/core";

type Props = {
  ascents: Ascent[];
};
export default function RouteAscents(props: Props) {
  return (
    <List>
      {props.ascents.map((ascent) => (
        <List.Item>{ascent.date}</List.Item>
      ))}
    </List>
  );
}
