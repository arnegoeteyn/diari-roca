import { test, describe, vi, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render } from "@/test-render";
import { Select } from "@mantine/core";
import SelectSector from "./select-sector.tsx";
import { UseFormReturnType } from "@mantine/form";
import { FormRoute } from "./route-form.tsx";
import { SectorOverview } from "@/lib/cache";

vi.mock("@mantine/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mantine/core")>();
  return {
    ...actual,
    Select: vi.fn(() => <div data-testid="mock-select" />),
  };
});

const MockSelect = vi.mocked(Select);

const mockForm = {
  key: vi.fn((field) => `form-key-${field}`),
  getInputProps: vi.fn((field) => ({
    name: field,
    value: "",
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  })),
} as unknown as UseFormReturnType<FormRoute>;
describe("components/routes/route-form/select-sector", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("uses the mantine select component", async () => {
    render(<SelectSector sectors={[]} form={mockForm} />);
    expect(MockSelect).toHaveBeenCalledOnce();
  });

  test("unchangeable when only one sector is passed", async () => {
    render(
      <SelectSector
        sectors={[{ sector: { id: 123 }, area: { id: 123 } } as SectorOverview]}
        form={mockForm}
      />,
    );
    expect(MockSelect).toHaveBeenCalledOnce();
  });
});
