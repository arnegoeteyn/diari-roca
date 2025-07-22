import { Ascent, AscentBody, AscentKind, ID, Pre } from "@/lib/routes/types";
import { formattedDate } from "@/util";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

type Props = {
  ascent?: AscentBody;
  onSubmit: (ascent: AscentBody) => void;
};

const initialValuesFromAscent = (ascent?: AscentBody): Required<AscentBody> => {
  const safeAscent: AscentBody = ascent
    ? ascent
    : {
        date: formattedDate(),
        kind: AscentKind.Redpoint,
      };

  return { ...safeAscent, comment: "" };
};

export default function LogForm(props: Props) {
  const { ascent, onSubmit } = props;

  const form = useForm({
    mode: "controlled",
    initialValues: initialValuesFromAscent(ascent),
    validate: {
      date: (value) => (value ? null : "Date is required"),
      kind: (value) => (value ? null : "Kind is required"),
    },
  });

  const onSubmitHandler = (ascent: AscentBody) => {
    onSubmit({
      ...ascent,
      comment: ascent.comment ? ascent.comment : undefined,
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
