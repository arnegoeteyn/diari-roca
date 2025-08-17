import { test, describe, vi, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import SectorContent from "./sector-content.tsx";
import { render } from "@testing-library/react";
import { Loader } from "@mantine/core";
import { SectorOverview } from "@/lib/routes/types.ts";
import PageTitle from "@/components/page-title.tsx";
import useSector from "@/hooks/use-sector.tsx";

vi.mock("@mantine/core", () => ({
  Loader: vi.fn(),
}));

vi.mock("@/components/page-title");
vi.mock("@/hooks/use-sector");

const MockLoader = vi.mocked(Loader);
const MockPageTitle = vi.mocked(PageTitle);
const MockUseSector = vi.mocked(useSector);

describe("pages/sector-content", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("shows loading spinner when no sector loaded", async () => {
    MockUseSector.mockReturnValueOnce([undefined, () => {}]);

    render(<SectorContent sectorId={123} />);
    expect(MockLoader).toHaveBeenCalledOnce();
  });

  test("shows page title when a sector is loaded", async () => {
    MockUseSector.mockReturnValueOnce([
      {
        sector: { name: "testSector" },
        area: { name: "testArea" },
      } as SectorOverview,
      () => {},
    ]);

    render(<SectorContent sectorId={123} />);
    expect(MockPageTitle).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ title: "testSector", subtitle: "testArea" }),
      undefined,
    );
  });
});
