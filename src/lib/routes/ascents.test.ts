import { describe, expect, test } from "vitest";
import { ID, Ascent, StoreData, Pre } from "./types";
import { addAscent } from "./ascents";

import "fake-indexeddb/auto";

describe("lib/ascents", () => {
  test("can add ascents", async () => {
    const data: StoreData = { ascents: new Map<ID, Ascent>() } as StoreData;

    const id = await addAscent({} as Pre<Ascent>);

    expect(id).toBeGreaterThan(0);
  });
});
