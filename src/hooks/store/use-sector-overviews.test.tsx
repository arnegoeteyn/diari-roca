import { cleanup, renderHook } from "@testing-library/react";
import { test, expect, describe, afterEach, vi } from "vitest";
import useSectorOverviews from "./use-sector-overviews";
import { useRoutesStore } from "./use-store";
import { Sector, Store } from "@/lib/routes";
import { getSectorOverviews, SectorOverview } from "@/lib/cache";

vi.mock("@/lib/cache");
vi.mock("@/hooks/store/use-store");

const MockedUseRoutesStore = vi.mocked(useRoutesStore);
const MockedGetSectorOverviews = vi.mocked(getSectorOverviews);

describe("<useSectorOverviews />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("returns all the sectors by default", async () => {
    MockedUseRoutesStore.mockReturnValue({
      initialized: true,
      data: {},
    } as Store);

    MockedGetSectorOverviews.mockReturnValue([
      {} as SectorOverview,
      {} as SectorOverview,
    ]);

    const { result } = renderHook(() => useSectorOverviews());
    expect(result.current).toHaveLength(2);
  });

  test("returns filtered when areaId is configured", async () => {
    MockedUseRoutesStore.mockReturnValue({
      initialized: true,
    } as Store);

    MockedGetSectorOverviews.mockReturnValue([
      { sector: { areaId: 1 } as Sector } as SectorOverview,
      { sector: { areaId: 3 } as Sector } as SectorOverview,
    ]);

    const { result } = renderHook(() => useSectorOverviews({ areaId: 3 }));
    expect(result.current).toHaveLength(1);
    expect(result.current).toEqual([{ sector: { areaId: 3 } }]);
  });
});
