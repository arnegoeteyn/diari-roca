import { isNotEmpty, useForm } from "@mantine/form";

import { Area, ID, Pre, Sector } from "@/lib/routes";
import { Button, Group, TextInput } from "@mantine/core";
import SelectArea from "./select-area";

type Props = {
  sector?: Pre<Sector>;
  areas: Area[];
  fixedAreaId?: ID;
  onSubmit: (sector: Pre<Sector>) => void;
};

export type FormSector = Required<
  Omit<Pre<Sector>, "areaId"> & { areaId: string }
>;

const initialValuesFromSector = (
  defaultAreaId: ID,
  sector?: Pre<Sector>,
): FormSector => {
  const safeSector: Pre<Sector> = sector
    ? sector
    : {
        name: "",
        areaId: defaultAreaId,
      };

  return {
    ...safeSector,
    areaId: safeSector.areaId.toString(),
  };
};

export function SectorForm(props: Props) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValuesFromSector(props.areas[0].id, props.sector),
    validate: {
      name: isNotEmpty("a sector has to have a name"),
      areaId: (value) => {
        if (!value) {
          return "area must be selected";
        }
        const number = parseInt(value);
        if (isNaN(number)) {
          return "Invalid areaId";
        }
        return null;
      },
    },
  });

  const onSubmit = (values: Partial<FormSector>): void => {
    // not ideal, mantine would already error if a property is empty
    // but the type to work with is still a Partial.
    // Let's just assume for now
    const valid = values as FormSector;
    props.onSubmit({ ...valid, areaId: parseInt(valid.areaId) });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        required
        label="Name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <SelectArea form={form} areas={props.areas} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
