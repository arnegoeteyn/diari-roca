import { test, describe, vi, expect } from "vitest";
import { render } from "@/test-render";
import { screen } from "@testing-library/react";
import RouteForm from "./route-form.tsx";
import { RouteKind, SectorOverview } from "@/lib/routes/types";

vi.mock("@mantine/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mantine/core")>();
  return {
    ...actual,
    Textarea: vi.fn(({ value, label }) => (
      <div data-testid={`mock-textarea-${label?.toLowerCase()}`}>{value}</div>
    )),
  };
});

const mockRoute = {
  name: "Test Route",
  grade: "7a",
  kind: RouteKind.Sport,
  media: [],
  sectorId: 1,
  comment: "This is a test comment",
  beta: "This is a test beta",
};
const mockSectors = [
  {
    sector: { id: 1, name: "Sector 1" },
    area: { id: 2, name: "Area 2" },
  },
] as SectorOverview[];

const mockOnSubmit = vi.fn();

describe("components/routes/route-form/select-sector", () => {
  test("form values are initialized correctly", async () => {
    render(
      <RouteForm
        route={mockRoute}
        sectors={mockSectors}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByTestId("mock-textarea-comment")).toHaveTextContent(
      "This is a test comment",
    );

    expect(screen.getByTestId("mock-textarea-beta")).toHaveTextContent(
      "This is a test beta",
    );
  });
});
