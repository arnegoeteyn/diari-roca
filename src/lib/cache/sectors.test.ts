import { describe, expect, test } from "vitest";
import {
  Area,
  NewStoreData as newStoreData,
  Pre,
  Route,
  Sector,
} from "@/lib/routes";
import {
  addSector,
  deleteSector,
  getSectorOverviews,
  sectorOverviewsForArea,
} from "./sectors";
import { addRoute } from "./routes";
import { storeArea } from "./areas";

describe("lib/cache/sectors", () => {
  test("can add sectors", async () => {
    let data = newStoreData();
    expect(data.sectors.size).toBe(0);

    data = addSector(data, 1, {} as Pre<Sector>);
    expect(data.sectors.size).toBe(1);
    data = addSector(data, 2, {} as Pre<Sector>);
    expect(data.sectors.size).toBe(2);
  });

  test("can delete sectors", async () => {
    let data = newStoreData();
    expect(data.sectors.size).toBe(0);

    data = addSector(data, 1, {} as Pre<Sector>);
    expect(data.sectors.size).toBe(1);
    data = addSector(data, 2, {} as Pre<Sector>);
    expect(data.sectors.size).toBe(2);

    data = deleteSector(data, 1);
    expect(data.sectors.size).toBe(1);

    expect([...data.sectors.keys()]).toEqual([2]);
  });

  test("will delete nested routes", async () => {
    let data = newStoreData();
    expect(data.sectors.size).toBe(0);

    data = addSector(data, 1, {} as Pre<Sector>);
    expect(data.sectors.size).toBe(1);
    data = addSector(data, 2, {} as Pre<Sector>);
    expect(data.sectors.size).toBe(2);

    data = addRoute(data, 1, { sectorId: 1 } as Pre<Route>);
    expect(data.routes.size).toBe(1);
    data = addRoute(data, 2, { sectorId: 2 } as Pre<Route>);
    expect(data.routes.size).toBe(2);
    data = addRoute(data, 3, { sectorId: 1 } as Pre<Route>);
    expect(data.routes.size).toBe(3);

    data = deleteSector(data, 1);
    expect(data.sectors.size).toBe(1);
    expect(data.routes.size).toBe(1);

    expect([...data.sectors.keys()]).toEqual([2]);
    expect([...data.routes.keys()]).toEqual([2]);
  });

  test("returns all the sector overviews by default", async () => {
    let data = newStoreData();

    data = storeArea(data, 1, { name: "area1" } as Pre<Area>);
    data = addSector(data, 1, { name: "sector1", areaId: 1 } as Pre<Sector>);
    data = addSector(data, 2, { name: "sector2", areaId: 1 } as Pre<Sector>);

    expect(getSectorOverviews(data)).toHaveLength(2);
  });

  test("filters sector overviews by area", async () => {
    let data = newStoreData();

    data = storeArea(data, 1, { name: "area1" } as Pre<Area>);
    data = storeArea(data, 3, { name: "area3" } as Pre<Area>);
    data = addSector(data, 1, { name: "sector1", areaId: 1 } as Pre<Sector>);
    data = addSector(data, 2, { name: "sector2", areaId: 3 } as Pre<Sector>);

    const filtered = sectorOverviewsForArea(data, 3);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].sector.areaId).toBe(3);
  });
});
