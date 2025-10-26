import { describe, expect, test } from "vitest";
import { Pre, Route, Ascent, NewStoreData as newStoreData } from "@/lib/routes";
import { addRoute, deleteRoute } from "./routes";
import { storeAscent } from "./ascents";

describe("lib/cache/routes", () => {
  test("can add routes", async () => {
    let data = newStoreData();
    expect(data.routes.size).toBe(0);

    data = addRoute(data, 1, {} as Pre<Route>);
    expect(data.routes.size).toBe(1);
    data = addRoute(data, 2, {} as Pre<Route>);
    expect(data.routes.size).toBe(2);
  });

  test("can delete routes", async () => {
    let data = newStoreData();
    expect(data.routes.size).toBe(0);

    data = addRoute(data, 1, {} as Pre<Route>);
    expect(data.routes.size).toBe(1);
    data = addRoute(data, 2, {} as Pre<Route>);
    expect(data.routes.size).toBe(2);

    data = deleteRoute(data, 1);
    expect(data.routes.size).toBe(1);

    expect([...data.routes.keys()]).toEqual([2]);
  });

  test("will delete nested ascents", async () => {
    let data = newStoreData();
    expect(data.routes.size).toBe(0);

    data = addRoute(data, 1, {} as Pre<Route>);
    expect(data.routes.size).toBe(1);
    data = addRoute(data, 2, {} as Pre<Route>);
    expect(data.routes.size).toBe(2);

    data = storeAscent(data, 1, { routeId: 1 } as Pre<Ascent>);
    expect(data.ascents.size).toBe(1);
    data = storeAscent(data, 2, { routeId: 2 } as Pre<Ascent>);
    expect(data.ascents.size).toBe(2);
    data = storeAscent(data, 3, { routeId: 1 } as Pre<Ascent>);
    expect(data.ascents.size).toBe(3);

    data = deleteRoute(data, 1);
    expect(data.routes.size).toBe(1);
    expect(data.ascents.size).toBe(1);

    expect([...data.routes.keys()]).toEqual([2]);
    expect([...data.ascents.keys()]).toEqual([2]);
  });
});
