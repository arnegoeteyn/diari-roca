import { describe, expect, test, beforeEach } from "vitest";
import { Pre } from "./types";
import { Ascent } from "./ascents";
import { addAscent, deleteAscent } from "./ascents";

import "fake-indexeddb/auto";
import { clear, load } from "./db";

describe("lib/ascents", () => {
  beforeEach(async () => {
    await clear();
  });

  test("can add ascents", async () => {
    let data = await load();
    expect(data.ascents.size).toBe(0);

    const firstId = await addAscent({} as Pre<Ascent>);
    expect(firstId).toBeGreaterThan(0);

    data = await load();
    expect(data.ascents.size).toBe(1);

    const secondId = await addAscent({} as Pre<Ascent>);
    expect(secondId).toBeGreaterThan(firstId);
  });

  test("can delete ascents", async () => {
    let data = await load();
    expect(data.ascents.size).toBe(0);

    const firstId = await addAscent({} as Pre<Ascent>);
    expect(firstId).toBeGreaterThan(0);

    const secondId = await addAscent({} as Pre<Ascent>);
    expect(secondId).toBeGreaterThan(firstId);

    data = await load();
    expect(data.ascents.size).toBe(2);

    await deleteAscent(firstId);
    data = await load();
    expect(data.ascents.size).toBe(1);
  });
});
