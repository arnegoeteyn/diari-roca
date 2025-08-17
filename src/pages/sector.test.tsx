import { test, describe, vi, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render } from "@/test-render";
import SectorPage from "./sector.tsx";
import SectorContent from "./sector-content.tsx";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("./sector-content.tsx", () => ({
  default: vi.fn(() => <></>),
}));

const MockSectorContent = vi.mocked(SectorContent);

describe("pages/sector", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("does not show content when no id", async () => {
    render(
      <MemoryRouter initialEntries={["/sector"]}>
        <Routes>
          <Route path="/sector" element={<SectorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(MockSectorContent).toHaveBeenCalledTimes(0);
  });

  test("does show content when no id", async () => {
    render(
      <MemoryRouter initialEntries={["/sector/123"]}>
        <Routes>
          <Route path="/sector/:sectorId" element={<SectorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(MockSectorContent).toHaveBeenCalledTimes(1);
  });

  test("shows content with the correct id", async () => {
    render(
      <MemoryRouter initialEntries={["/sector/7575"]}>
        <Routes>
          <Route path="/sector/:sectorId" element={<SectorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(MockSectorContent).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ sectorId: 7575 }),
      undefined,
    );
  });

  test("does not show content when id is not numeric", async () => {
    render(
      <MemoryRouter initialEntries={["/sector/abc"]}>
        <Routes>
          <Route path="/sector/:sectorId" element={<SectorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(MockSectorContent).toHaveBeenCalledTimes(0);
  });
});
