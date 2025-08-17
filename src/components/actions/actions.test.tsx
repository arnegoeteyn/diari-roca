import { cleanup, screen } from "@testing-library/react";
import { test, expect, describe, afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Actions from "./actions";
import { render } from "@/test-render";
import RoutesActions from "./routes-actions";
import AscentsActions from "./ascents-actions";
import SectorsActions from "./sectors-actions";

vi.mock("./routes-actions");
vi.mock("./ascents-actions");
vi.mock("@/components/actions/sectors-actions");

const MockRoutesActions = vi.mocked(RoutesActions);
const MockSectorsActions = vi.mocked(SectorsActions);
const MockAscentsActions = vi.mocked(AscentsActions);

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
    render(<Actions location="/sectors/123" />);

    expect(MockSectorsActions).toHaveBeenCalled();
  });

  test("loads ascents-actions on /ascents", async () => {
    render(<Actions location="/ascents" />);

    expect(MockRoutesActions).toHaveBeenCalledTimes(0);
    expect(MockAscentsActions).toHaveBeenCalled();
  });
});
