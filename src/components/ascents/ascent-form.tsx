import { Ascent, AscentKind, ID, Pre } from "@/lib/routes/types";
import { formattedDate } from "@/util";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

type AscentWithoutRoute = Omit<Ascent, "routeId">;

type Props = {
  routeId: ID;
  ascent?: Pre<AscentWithoutRoute>;
  onSubmit: (ascent: Pre<Ascent>) => void;
};

const initialValuesFromAscent = (
  ascent?: Pre<AscentWithoutRoute>
): Required<Pre<AscentWithoutRoute>> => {
  const safeAscent: Pre<AscentWithoutRoute> = ascent
    ? ascent
    : {
        date: formattedDate(),
        kind: AscentKind.Redpoint,
      };

  return { ...safeAscent, comment: "" };
};

const newAscent = (): Pre<Omit<Ascent, "routeId">> => ({
  date: formattedDate(),
  kind: AscentKind.Redpoint,
});

export default function LogForm(props: Props) {
  const { ascent, routeId, onSubmit } = props;

  const form = useForm({
    mode: "controlled",
    initialValues: initialValuesFromAscent(ascent),
    validate: {
      date: (value) => (value ? null : "Date is required"),
      kind: (value) => (value ? null : "Kind is required"),
    },
  });

  const onSubmitHandler = (ascent: Omit<Pre<Ascent>, "routeId">) => {
    onSubmit({
      ...ascent,
      comment: ascent.comment ? ascent.comment : undefined,
      routeId,
    });
  };

  const ascentKindOptions = Object.values(AscentKind).map((kind) => ({
    value: kind,
    label: kind.charAt(0).toUpperCase() + kind.slice(1), // Capitalize the first letter
  }));

  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      <TextInput label="Comment" {...form.getInputProps("comment")} />

      <DateInput
        label="Date"
        placeholder="Pick a date"
        {...form.getInputProps("date")}
      />

      <Select
        label="Kind"
        placeholder="Pick one"
        data={ascentKindOptions}
        {...form.getInputProps("kind")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
