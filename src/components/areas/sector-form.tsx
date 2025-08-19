import { isNotEmpty, useForm } from "@mantine/form";

import { Area, ID, Pre, Sector } from "@/lib/routes";
import { Button, Group, Select, TextInput } from "@mantine/core";

type Props = {
  sector?: Pre<Sector>;
  areas: Area[];
  fixedAreaId?: ID;
  onSubmit: (sector: Pre<Sector>) => void;
};

type FormSector = Omit<Pre<Sector>, "areaId"> & { areaId: string };

export function SectorForm(props: Props) {
  const getInitialValues = (): Partial<FormSector> => {
    const areaId = props.fixedAreaId ? props.fixedAreaId : props.sector?.areaId;
    const init = { ...props.sector, areaId: areaId?.toString() };
    return init;
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: getInitialValues(),
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
      <Select
        required
        label="Area"
        placeholder="Area"
        searchable
        key={form.key("areaId")}
        data={props.areas.map((area) => ({
          value: area.id.toString(),
          label: area.name,
        }))}
        {...form.getInputProps("areaId")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
