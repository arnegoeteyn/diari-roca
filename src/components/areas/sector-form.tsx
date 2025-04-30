import { useForm } from "@mantine/form";

import { ID, Pre, Sector } from "@/lib/routes/types";
import { Button, Group, TextInput } from "@mantine/core";

type Props = {
  sector?: Pre<Sector>;
  fixedAreaId?: ID;
  onSubmit: (sector: Pre<Sector>) => void;
};

export function SectorForm(props: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: props.sector,
    validate: {
      name: (value) => (value.length > 0 ? null : "Name can not be empty"),
      areaId: () => null,
    },
  });

  return (
    <form onSubmit={form.onSubmit(props.onSubmit)}>
      <TextInput
        withAsterisk
        label="Name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
