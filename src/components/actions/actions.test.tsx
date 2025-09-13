import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Actions from "./actions";
import { render } from "@/test-render";
import RoutesActions from "./routes-actions";
import AscentsActions from "./ascents-actions";
import SectorsActions from "@/components/actions/sectors-actions";
import AreasActions from "./areas-actions";
import AreaActions from "@/components/actions/area-actions";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("./routes-actions");
vi.mock("./ascents-actions");
vi.mock("@/components/actions/sectors-actions");
vi.mock("@/components/actions/area-actions");
vi.mock("@/components/actions/areas-actions");

const MockRoutesActions = vi.mocked(RoutesActions);
const MockSectorsActions = vi.mocked(SectorsActions);
const MockAscentsActions = vi.mocked(AscentsActions);
const MockAreaActions = vi.mocked(AreaActions);
const MockAreasActions = vi.mocked(AreasActions);

describe("<Actions/>", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("loads nothing on a page without actions", async () => {
    render(<Actions location="/this-def-does-not-exist" />);

    expect(screen.getByTestId("no-actions")).toBeInTheDocument();
  });

  test("loads routesactions on /routes", async () => {
    render(<Actions location="/routes" />);

    expect(MockRoutesActions).toHaveBeenCalled();
  });

  test("loads routesactions on /routes/123", async () => {
    render(<Actions location="/routes" />);

    expect(MockRoutesActions).toHaveBeenCalled();
  });

  test("loads sector-actions on /sectors/123", async () => {
    render(
      <MemoryRouter initialEntries={["/sectors/123"]}>
        <Routes>
          <Route
            path="/sectors/:sectorId"
            element={<Actions location="/sectors/123" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(MockSectorsActions).toHaveBeenCalledExactlyOnceWith(
      { sectorId: 123 },
      undefined,
    );
  });

  test("loads ascents-actions on /ascents", async () => {
    render(<Actions location="/ascents" />);

    expect(MockRoutesActions).toHaveBeenCalledTimes(0);
    expect(MockAscentsActions).toHaveBeenCalled();
  });

  test("loads area-actions on /areas/123", async () => {
    render(
      <MemoryRouter initialEntries={["/areas/123"]}>
        <Routes>
          <Route
            path="/areas/:areaId"
            element={<Actions location="/areas/123" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(MockAreaActions).toHaveBeenCalledExactlyOnceWith(
      { areaId: 123 },
      undefined,
    );
  });

  test("loads areas-actions on /areas", async () => {
    render(
      <MemoryRouter initialEntries={["/areas"]}>
        <Routes>
          <Route path="/areas" element={<Actions location="/areas" />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(MockAreasActions).toHaveBeenCalledExactlyOnceWith({}, undefined);
  });
});
