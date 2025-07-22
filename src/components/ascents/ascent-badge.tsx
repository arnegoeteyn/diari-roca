import { AscentBody, AscentKind } from "@/lib/routes/types";
import { Badge } from "@mantine/core";
import { Eye, Zap, Repeat, CornerRightUp, ArrowUp } from "lucide-react";

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

type Props = {
  ascent: AscentBody;
};
export default function AscentBadge(props: Props) {
  const { ascent } = props;
  return (
    <Badge
      leftSection={kindToBadge[ascent.kind].icon}
      color={kindToBadge[ascent.kind].color}
      variant="light"
    >
      {kindToBadge[ascent.kind].label}
    </Badge>
  );
}
