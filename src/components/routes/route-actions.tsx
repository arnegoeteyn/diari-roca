import { Button, ButtonProps, ButtonVariant, Group } from "@mantine/core";
import { ArrowRight, Edit, PlusCircle, Trash } from "lucide-react";
import { ReactElement } from "react";

type Props = {
  shownActions?: Action[];
};

type Action = {
  title: string;
  icon: ReactElement;
  color?: ButtonProps["color"];
};

export const ACTION: Record<string, Action> = {
  edit: { icon: <Edit />, title: "Edit" },
  delete: { icon: <Trash />, title: "Delete", color: "red" },
  log: { icon: <PlusCircle />, title: "Log" },
  visit: { icon: <ArrowRight />, title: "Go" },
};

const actions = Object.values(ACTION);

export default function RouteActions(props: Props) {
  const shownActions = props.shownActions || actions;

  return (
    <Group>
      {shownActions.map((action) => (
        <Button leftSection={action.icon} color={action.color}>
          {action.title}
        </Button>
      ))}
    </Group>
  );
}
