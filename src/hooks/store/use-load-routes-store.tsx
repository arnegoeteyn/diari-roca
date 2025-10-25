// import { StoreData } from "@/lib/routes";
// import { useRoutesStore } from "./use-store";
import {
  addAscent,
  addRoute,
  addSector,
  Area,
  Ascent,
  putArea,
  Route,
  Sector,
  Trip,
} from "@/lib/routes";
import { clear, load } from "@/lib/routes/db";
import { putTrip } from "@/lib/routes/trips";
import { useFileDialog, UseFileDialogReturnValue } from "@mantine/hooks";
import { useRoutesStore } from "./use-store";

type Parsed = {
  routes: Route[];
  ascents: Ascent[];
  areas: Area[];
  sectors: Sector[];
  trips: Trip[];
};

export default function useLoadRoutesStore(): UseFileDialogReturnValue {
  const store = useRoutesStore((store) => store.setStore);

  const fileDialog = useFileDialog({
    multiple: false,
    onChange: async (files) => {
      if (files?.length != 1) {
        return;
      }

      const file = files[0];
      const fileReader = new FileReader();

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (e) => {
        if (!e.target) {
          return;
        }

        const parsed: Parsed = JSON.parse(e.target.result as string);

        await clear();

        const routes = parsed.routes.map((route) =>
          addRoute(route).catch(() =>
            console.error("could not import route", route.name),
          ),
        );
        const ascents = parsed.ascents.map((ascent) => {
          addAscent(ascent).catch(() =>
            console.error("could not import ascent", ascent),
          );
        });

        const sectors = parsed.sectors.map((sector) => {
          addSector(sector).catch(() =>
            console.error("could not import sector", sector),
          );
        });

        const areas = parsed.areas.map((area) => {
          putArea(area).catch(() =>
            console.error("could not import area", area),
          );
        });

        const trips = parsed.trips.map((trip) => {
          putTrip(trip).catch(() =>
            console.error("could not import trip", trip),
          );
        });

        const actions = [...routes, ...ascents, ...sectors, ...areas, ...trips];
        await Promise.all(actions);

        const content = await load();
        store(content);
      };
    },
  });

  return fileDialog;
}
