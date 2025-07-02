import { Pre, Route } from "@/lib/routes/types";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  route: Pre<Route>;
  onSubmit: (route: Pre<Route>) => void;
};

export default function RouteForm(props: Props) {
  const { route } = props;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: route,
    validate: {
      name: (value) => (value.length > 0 ? null : "Name can not be empty"),
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
