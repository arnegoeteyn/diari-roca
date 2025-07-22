import { Button } from "@/components/ui/button";
import { addAscent, addRoute, Ascent, clear, Route } from "@/lib/routes";
import { useState } from "react";

type Parsed = {
  routes: Route[];
  ascents: Ascent[];
  areas: object[];
  sectors: object[];
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
    file.routes.forEach((route) =>
      addRoute(route).catch(() =>
        console.log("could not import route", route.name)
      )
    );
    file.ascents.forEach((ascent) => {
      console.log(ascent.date);
      addAscent(ascent).catch(() =>
        console.log("could not import ascent", ascent)
      );
    });
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
