import { Button, ButtonProps, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowRight, Edit, PlusCircle, Trash } from "lucide-react";
import { ReactElement, useCallback } from "react";
import RouteForm from "./route-form.tsx";
import { useNavigate } from "react-router-dom";
import AscentForm from "../ascents/ascent-form";
import { useIsSmall } from "@/hooks/use-small";
import useSectors from "@/hooks/use-sectors.tsx";
import { useRouteContext } from "@/contexts/route-context-util.ts";

type Props = {
  hideVisitAction?: boolean;
  compact?: boolean;
};

type Action = {
  title: string;
  icon: ReactElement;
  color?: ButtonProps["color"];
  action?: () => void;
  hidden?: boolean;
};

export default function RouteActions(props: Props) {
  const { hideVisitAction, compact } = props;
  const { route, updateRoute, logAscent } = useRouteContext();
  const sectors = useSectors();

  const isMobile = useIsSmall();

  const [routeOpened, { open: routeOpen, close: routeClose }] =
    useDisclosure(false);
  const [logOpened, { open: logOpen, close: logClose }] = useDisclosure(false);

  const navigate = useNavigate();

  const visitRoute = useCallback(
    () => navigate(`/routes/${route.id}`),
    [route.id, navigate],
  );

  const actions: Record<string, Action> = {
    edit: { icon: <Edit />, title: "Edit", action: routeOpen },
    log: { icon: <PlusCircle />, title: "Log", action: logOpen },
    delete: { icon: <Trash />, title: "Delete", color: "red" },
    visit: {
      icon: <ArrowRight />,
      title: "Go",
      hidden: hideVisitAction,
      action: visitRoute,
    },
  };

  const shownActions = Object.values(actions).filter((a) => !a.hidden);

  return (
    <>
      <Modal
        opened={routeOpened}
        onClose={() => routeClose()}
        title={`Edit "${route.name}"`}
      >
        <RouteForm
          route={route}
          sectors={sectors}
          onSubmit={(update) => {
            updateRoute({ ...update, id: route.id }).then(routeClose);
          }}
        />
      </Modal>
      <Modal
        opened={logOpened}
        onClose={() => logClose()}
        title={`Log "${route.name}"`}
      >
        <AscentForm
          onSubmit={(update) => {
            logAscent(update).then(logClose);
          }}
        />
      </Modal>
      <Group wrap="nowrap" gap="xs">
        {shownActions.map((action) => (
          <Button
            variant="subtle"
            size={isMobile ? "xs" : "md"}
            key={action.title}
            onClick={action.action}
            leftSection={compact ? null : action.icon}
            color={action.color}
          >
            {compact ? action.icon : action.title}
          </Button>
        ))}
      </Group>
    </>
  );
}
