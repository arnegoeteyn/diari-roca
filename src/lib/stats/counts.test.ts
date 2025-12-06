import { describe, expect, test } from "vitest";
import { Area, Ascent, NewStoreData, Pre, Route, Sector } from "@/lib/routes";
import { counts } from "./counts";
import { addRoute, storeAscent, addSector, storeArea } from "@/lib/cache";

describe("lib/stats/counts", () => {
  test("returns correct count on empty file", async () => {
    const data = NewStoreData();
    const stats = counts(data);
    expect(stats.routesCount).toBe(0);
    expect(stats.ascentsCount).toBe(0);
    expect(stats.sectorsCount).toBe(0);
    expect(stats.areasCount).toBe(0);
    expect(stats.tripsCount).toBe(0);
  });

  test("returns correct count on filled file", async () => {
    let data = NewStoreData();

    data = addRoute(data, 1, {} as Pre<Route>);

    data = storeAscent(data, 1, {} as Pre<Ascent>);
    data = storeAscent(data, 2, {} as Pre<Ascent>);

    data = addSector(data, 1, {} as Pre<Sector>);
    data = addSector(data, 2, {} as Pre<Sector>);
    data = addSector(data, 3, {} as Pre<Sector>);

    data = storeArea(data, 1, {} as Pre<Area>);
    data = storeArea(data, 2, {} as Pre<Area>);

    const stats = counts(data);
    expect(stats.routesCount).toBe(1);
    expect(stats.ascentsCount).toBe(2);
    expect(stats.sectorsCount).toBe(3);
    expect(stats.areasCount).toBe(2);
    expect(stats.tripsCount).toBe(0);
  });

  test("returns correct amount of unique ascents", async () => {
    let data = NewStoreData();

    data = addRoute(data, 1, {} as Pre<Route>);
    data = addRoute(data, 2, {} as Pre<Route>);
    data = addRoute(data, 3, {} as Pre<Route>);

    data = storeAscent(data, 1, { routeId: 1 } as Pre<Ascent>);
    data = storeAscent(data, 2, { routeId: 2 } as Pre<Ascent>);
    data = storeAscent(data, 3, { routeId: 2 } as Pre<Ascent>);
    data = storeAscent(data, 4, { routeId: 2 } as Pre<Ascent>);

    const stats = counts(data);
    expect(stats.routesCount).toBe(3);
    expect(stats.ascentsCount).toBe(4);
    expect(stats.uniqueAscentsCount).toBe(2);
  });

  test("ascents of non-existing routes are ignored", async () => {
    let data = NewStoreData();

    data = addRoute(data, 1, {} as Pre<Route>);

    data = storeAscent(data, 1, { routeId: 1 } as Pre<Ascent>);
    data = storeAscent(data, 2, { routeId: 2 } as Pre<Ascent>);
    data = storeAscent(data, 3, { routeId: 2 } as Pre<Ascent>);
    data = storeAscent(data, 4, { routeId: 2 } as Pre<Ascent>);

    const stats = counts(data);
    expect(stats.routesCount).toBe(1);
    expect(stats.ascentsCount).toBe(4);
    expect(stats.uniqueAscentsCount).toBe(1);
  });
});
