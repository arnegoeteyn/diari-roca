import { describe, expect, test, beforeEach } from "vitest";
import { Pre } from "./types";
import { Route } from "./routes";
import { addRoute, deleteRoute } from "./routes";

import "fake-indexeddb/auto";
import { clear, load } from "./db";

describe("lib/routes/routes", () => {
  beforeEach(async () => {
    await clear();
  });

  test("can add routes", async () => {
    let data = await load();
    expect(data.routes.size).toBe(0);

    const firstId = await addRoute({} as Pre<Route>);
    expect(firstId).toBeGreaterThan(0);

    data = await load();
    expect(data.routes.size).toBe(1);

    const secondId = await addRoute({} as Pre<Route>);
    expect(secondId).toBeGreaterThan(firstId);
  });

  test("can delete routes", async () => {
    let data = await load();
    expect(data.routes.size).toBe(0);

    const firstId = await addRoute({} as Pre<Route>);
    expect(firstId).toBeGreaterThan(0);

    const secondId = await addRoute({} as Pre<Route>);
    expect(secondId).toBeGreaterThan(firstId);

    data = await load();
    expect(data.routes.size).toBe(2);

    await deleteRoute(firstId);

    data = await load();
    expect(data.routes.size).toBe(1);
  });
});
