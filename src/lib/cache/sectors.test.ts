import { describe, expect, test } from "vitest";
import { Pre, Sector, NewStoreData as newStoreData, Route } from "@/lib/routes";
import { addSector, deleteSector } from "./sectors";
import { addRoute } from "./routes";

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
});
