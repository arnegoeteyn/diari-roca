import { test, describe, vi, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import SectorContent from "./sector-content.tsx";
import { render } from "@/test-render.tsx";
import { Loader } from "@mantine/core";
import PageTitle from "@/components/page-title.tsx";
import RouteTable from "@/components/routes/routes-table.tsx";
import { useRoutesStore } from "@/hooks/store/use-store";
import {
  Area,
  NewStoreData as newStoreData,
  Pre,
  Sector,
  Store,
} from "@/lib/routes";
import { storeArea } from "@/lib/cache/areas";
import { addSector } from "@/lib/cache/sectors";

vi.mock("@mantine/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mantine/core")>();
  return {
    ...actual,
    Loader: vi.fn(),
  };
});

vi.mock("@/components/page-title");
vi.mock("@/components/routes/routes-table");

vi.mock("@/hooks/store/use-store");

const MockLoader = vi.mocked(Loader);
const MockPageTitle = vi.mocked(PageTitle);
const MockUseRoutesStore = vi.mocked(useRoutesStore);
const MockRouteTable = vi.mocked(RouteTable);

function storeWithSector() {
  let data = newStoreData();
  data = storeArea(data, 1, { name: "testArea" } as Pre<Area>);
  data = addSector(data, 123, {
    name: "testSector",
    areaId: 1,
  } as Pre<Sector>);

  return { initialized: true, data } as Store;
}

describe("pages/sector-content", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("shows loading spinner when no sector loaded", async () => {
    MockUseRoutesStore.mockReturnValue({
      initialized: false,
      data: newStoreData(),
    } as Store);

    render(<SectorContent sectorId={123} />);
    expect(MockLoader).toHaveBeenCalledOnce();
  });

  test("shows page title when a sector is loaded", async () => {
    MockUseRoutesStore.mockReturnValue(storeWithSector());

    render(<SectorContent sectorId={123} />);
    expect(MockPageTitle).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ title: "testSector", subtitle: "testArea" }),
      undefined,
    );
  });

  test("includes routes on page", async () => {
    MockUseRoutesStore.mockReturnValue(storeWithSector());

    render(<SectorContent sectorId={123} />);
    expect(MockRouteTable).toHaveBeenCalledOnce();
  });
});
