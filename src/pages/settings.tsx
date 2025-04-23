import { addArea, putArea } from "@/lib/routes/areas";
import { addAscent } from "@/lib/routes/ascents";
import { clear } from "@/lib/routes/db";
import { addRoute } from "@/lib/routes/routes";
import { addSector } from "@/lib/routes/sectors";
import { Area, Ascent, Route, Sector } from "@/lib/routes/types";
import { Button } from "@mantine/core";
import { useState } from "react";

type Parsed = {
  routes: Route[];
  ascents: Ascent[];
  areas: Area[];
  sectors: Sector[];
  trips: object[];
};

export default function Import() {
  const [file, setFile] = useState<Parsed>({
    routes: [],
    ascents: [],
    areas: [],
    sectors: [],
    trips: [],
  });
  const [loaded, setLoaded] = useState<boolean>(false);

  const [importing, setImporting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const target = e.target;
    if (!target.files) return;
    fileReader.readAsText(target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (!e.target) {
        return;
      }
      const parsed = JSON.parse(e.target.result as string);
      setFile(parsed);
      setLoaded(true);
    };
  };

  const save = async () => {
    setImporting(true);
    await clear();
    console.log("cleared");
    const routes = file.routes.map((route) =>
      addRoute(route).catch(() =>
        console.log("could not import route", route.name)
      )
    );
    const ascents = file.ascents.map((ascent) => {
      addAscent(ascent).catch(() =>
        console.log("could not import ascent", ascent)
      );
    });

    const sectors = file.sectors.map((sector) => {
      addSector(sector).catch(() =>
        console.log("could not import sector", sector)
      );
    });

    const areas = file.areas.map((area) => {
      putArea(area).catch(() => console.log("could not import area", area));
    });

    const actions = [...routes, ...ascents, ...sectors, ...areas];
    await Promise.all(actions);

    setImporting(false);
  };

  if (importing) {
    return <p>importing your routes</p>;
  }

  return (
    <>
      <h1>Import a route file</h1>
      <input type="file" onChange={handleChange}></input>
      <Button onClick={save} disabled={!loaded}>
        Save
      </Button>

      {loaded && (
        <div>
          <p>Your file has the following</p>
          <p>{file.routes.length} routes</p>
          <p>{file.ascents.length} ascents</p>
          <p>{file.areas.length} areas</p>
          <p>{file.sectors.length} sectors</p>
          <p>{file.trips.length} trips</p>
        </div>
      )}
    </>
  );
}
