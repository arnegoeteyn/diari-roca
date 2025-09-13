import { test, describe, vi, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render } from "@/test-render";
import { Select } from "@mantine/core";
import SelectArea from "./select-area.tsx";
import { UseFormReturnType } from "@mantine/form";
import { Area } from "@/lib/routes";
import { FormSector } from "./sector-form.tsx";

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
} as unknown as UseFormReturnType<FormSector>;

describe("components/sectors/sector-form/select-area", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("uses the mantine select component", async () => {
    render(<SelectArea areas={[]} form={mockForm} />);
    expect(MockSelect).toHaveBeenCalledOnce();
  });

  test("unchangeable when only one sector is passed", async () => {
    render(<SelectArea areas={[{ id: 123 } as Area]} form={mockForm} />);
    expect(MockSelect).toHaveBeenCalledOnce();
  });
});
