import RouteTable from "@/components/routes-table";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import useRoutes from "@/hooks/use-routes";
import { TabsList } from "@radix-ui/react-tabs";
import { RouteKind } from "@/lib/routes/types";

const routesParam = { kind: RouteKind.Sport };
const boulderParams = { kind: RouteKind.Boulder };

export default function Routes() {
  const [routes] = useRoutes(routesParam);
  const [boulders] = useRoutes(boulderParams);

  return (
    <div>
      <Tabs defaultValue="sport">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sport">Routes</TabsTrigger>
          <TabsTrigger value="boulder">Boulders</TabsTrigger>
        </TabsList>
        <TabsContent value="sport">
          <RouteTable routes={routes} />
        </TabsContent>
        <TabsContent value="boulder">
          <RouteTable routes={boulders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
