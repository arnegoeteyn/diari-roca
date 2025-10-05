import { describe, expect, test } from "vitest";
import { Pre, ID, Ascent } from "@/lib/routes";
import { StoreData } from "../routes";
import { deleteAscent, storeAscent } from "./ascents";

describe("lib/ascents", () => {
  test("can add ascents", async () => {
    let data = { ascents: new Map<ID, Ascent>() } as StoreData;
    expect(data.ascents.size).toBe(0);

    data = storeAscent(data, 1, {} as Pre<Ascent>);
    expect(data.ascents.size).toBe(1);
    data = storeAscent(data, 2, {} as Pre<Ascent>);
    expect(data.ascents.size).toBe(2);
  });

  test("can delete ascents", async () => {
    let data = { ascents: new Map<ID, Ascent>() } as StoreData;
    expect(data.ascents.size).toBe(0);

    data = storeAscent(data, 1, {} as Pre<Ascent>);
    expect(data.ascents.size).toBe(1);
    data = storeAscent(data, 2, {} as Pre<Ascent>);
    expect(data.ascents.size).toBe(2);

    data = deleteAscent(data, 1);
    expect(data.ascents.size).toBe(1);

    expect([...data.ascents.keys()]).toEqual([2]);
  });
});
