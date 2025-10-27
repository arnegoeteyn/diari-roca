import { describe, expect, test, beforeEach } from "vitest";
import { Pre } from "./types";

import "fake-indexeddb/auto";
import { clear, load } from "./db";
import { addSector, deleteSector, Sector } from "./sectors";
import { addRoute, Route } from "./routes";

describe("lib/routes/sectors", () => {
  beforeEach(async () => {
    await clear();
  });

  test("can add sectors", async () => {
    let data = await load();
    expect(data.sectors.size).toBe(0);

    const firstId = await addSector({} as Pre<Sector>);
    expect(firstId).toBeGreaterThan(0);

    data = await load();
    expect(data.sectors.size).toBe(1);

    const secondId = await addSector({} as Pre<Sector>);
    expect(secondId).toBeGreaterThan(firstId);
  });

  test("can delete sectors", async () => {
    let data = await load();
    expect(data.sectors.size).toBe(0);

    const firstId = await addSector({} as Pre<Sector>);
    expect(firstId).toBeGreaterThan(0);

    const secondId = await addSector({} as Pre<Sector>);
    expect(secondId).toBeGreaterThan(firstId);

    data = await load();
    expect(data.sectors.size).toBe(2);

    await deleteSector(firstId);

    data = await load();
    expect(data.sectors.size).toBe(1);
  });

  test("can delete nested sectors", async () => {
    let data = await load();
    expect(data.sectors.size).toBe(0);

    const firstId = await addSector({} as Pre<Sector>);
    expect(firstId).toBeGreaterThan(0);

    const secondId = await addSector({} as Pre<Sector>);
    expect(secondId).toBeGreaterThan(firstId);

    addRoute({ sectorId: firstId } as Pre<Route>);
    addRoute({ sectorId: firstId } as Pre<Route>);
    addRoute({ sectorId: secondId } as Pre<Route>);
    addRoute({ sectorId: firstId } as Pre<Route>);

    data = await load();
    expect(data.sectors.size).toBe(2);
    expect(data.routes.size).toBe(4);

    await deleteSector(firstId);

    data = await load();
    expect(data.sectors.size).toBe(1);
    expect(data.routes.size).toBe(1);
  });
});
