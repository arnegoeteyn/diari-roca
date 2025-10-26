import { Route } from "@/lib/routes";
import { Text } from "@mantine/core";

type Props = {
  route: Route;
};

const noInformationText = "No information provided about this route.";

export default function RouteInformation(props: Props) {
  return (
    <div>
      <Text pb={4} style={{ whiteSpace: "pre-wrap" }}>
        {props.route.comment ?? noInformationText}
      </Text>
      <Text style={{ whiteSpace: "pre-wrap" }} fs={"italic"}>
        {props.route.beta}
      </Text>
    </div>
  );
}
