import { Button, Stack } from "@mantine/core";
import { useRoutesStore } from "@/hooks/store/use-store";
import { Area, Ascent, Route, Sector, StoreData, Trip } from "@/lib/routes";
import useLoadRoutesStore from "@/hooks/store/use-load-routes-store";

type Parsed = {
  routes: Route[];
  ascents: Ascent[];
  areas: Area[];
  sectors: Sector[];
  trips: Trip[];
};

function saveData(data: StoreData) {
  const parsed: Parsed = {
    routes: [...data.routes.values()],
    areas: [...data.areas.values()],
    ascents: [...data.ascents.values()],
    sectors: [...data.sectors.values()],
    trips: [...data.trips.values()],
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(parsed, undefined, 4)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = `routes-${currentDate}`;

  element.click();

  document.body.removeChild(element);
}

export default function SettingsActions() {
  const data = useRoutesStore((store) => store.store.data);
  const loadRoutes = useLoadRoutesStore();
  return (
    <Stack p={"16px"}>
      <Button onClick={() => saveData(data)}>Export</Button>
      <Button onClick={loadRoutes.open}>Import</Button>
    </Stack>
  );
}
