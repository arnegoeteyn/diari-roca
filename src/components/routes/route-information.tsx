import { Route } from "@/lib/routes/types";
import { Text } from "@mantine/core";

type Props = {
  route: Route;
};

const noInformationText = "No information provided about this route.";

export default function RouteInformation(props: Props) {
  return (
    <div>
      <Text>{props.route.comment ?? noInformationText}</Text>
      <Text fs={"italic"}>{props.route.beta}</Text>
    </div>
  );
}
