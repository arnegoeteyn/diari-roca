import { useRoute } from "@/hooks/use-route";
import { Text } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function Route() {
  const { routeId } = useParams();

  const [route, loading] = useRoute(routeId);

  if (Number.isNaN(routeId)) {
    return <p>Invalid routeId</p>;
  }

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div>
      <h1>
        {route.route.name} ~ {route.route.grade} ({route.route.kind})
      </h1>
      <h2>
        {route.sector.name} - {route.area.name}
      </h2>
      <p>{route.route.comment}</p>
      {route.route.beta ? (
        <Text>{route.route.beta}</Text>
      ) : (
        // <Accordion type="single" collapsible className="w-full">
        //   <AccordionItem value="beta">
        //     <AccordionTrigger>Route beta</AccordionTrigger>
        //     <AccordionContent>{route.route.beta}</AccordionContent>
        //   </AccordionItem>
        // </Accordion>
        <p>No beta for this route</p>
      )}

      <ul>
        {route.ascents.map((ascent) => (
          <div key={ascent.id}>
            <p>
              {ascent.date} - {ascent.kind}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}
