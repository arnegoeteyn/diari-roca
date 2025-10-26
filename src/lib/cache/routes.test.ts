import { describe, expect, test } from "vitest";
import { Pre, ID, Route } from "@/lib/routes";
import { StoreData } from "../routes";
import { addRoute, deleteRoute } from "./routes";

describe("lib/cache/routes", () => {
  test("can add routes", async () => {
    let data = { routes: new Map<ID, Route>() } as StoreData;
    expect(data.routes.size).toBe(0);

    data = addRoute(data, 1, {} as Pre<Route>);
    expect(data.routes.size).toBe(1);
    data = addRoute(data, 2, {} as Pre<Route>);
    expect(data.routes.size).toBe(2);
  });

  test("can delete routes", async () => {
    let data = { routes: new Map<ID, Route>() } as StoreData;
    expect(data.routes.size).toBe(0);

    data = addRoute(data, 1, {} as Pre<Route>);
    expect(data.routes.size).toBe(1);
    data = addRoute(data, 2, {} as Pre<Route>);
    expect(data.routes.size).toBe(2);

    data = deleteRoute(data, 1);
    expect(data.routes.size).toBe(1);

    expect([...data.routes.keys()]).toEqual([2]);
  });
});
