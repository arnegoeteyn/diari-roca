import { test, describe, vi, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import SectorContent from "./sector-content.tsx";
import { render } from "@testing-library/react";
import { Loader } from "@mantine/core";
import { SectorOverview } from "@/lib/cache";
import PageTitle from "@/components/page-title.tsx";
import useSectorOverview from "@/hooks/store/use-sector-overview.tsx";
import RouteTable from "@/components/routes/routes-table.tsx";

vi.mock("@mantine/core", () => ({
  Loader: vi.fn(),
}));

vi.mock("@/components/page-title");
vi.mock("@/components/routes/routes-table");

vi.mock("@/hooks/store/use-sector-overview");

const MockLoader = vi.mocked(Loader);
const MockPageTitle = vi.mocked(PageTitle);
const MockUseSector = vi.mocked(useSectorOverview);
const MockRouteTable = vi.mocked(RouteTable);

MockUseSector.mockReturnValue({
  sector: { name: "testSector" },
  area: { name: "testArea" },
} as SectorOverview);

describe("pages/sector-content", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("shows loading spinner when no sector loaded", async () => {
    MockUseSector.mockReturnValueOnce(undefined);

    render(<SectorContent sectorId={123} />);
    expect(MockLoader).toHaveBeenCalledOnce();
  });

  test("shows page title when a sector is loaded", async () => {
    render(<SectorContent sectorId={123} />);
    expect(MockPageTitle).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ title: "testSector", subtitle: "testArea" }),
      undefined,
    );
  });

  test("includes routes on page", async () => {
    render(<SectorContent sectorId={123} />);
    expect(MockRouteTable).toHaveBeenCalledOnce();
  });
});
