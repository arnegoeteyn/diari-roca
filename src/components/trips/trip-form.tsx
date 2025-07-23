import { Pre, Trip } from "@/lib/routes/types";
import { formattedDate } from "@/util";
import { Button, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

type Props = {
  trip?: Pre<Trip>;
  onSubmit: (trip: Pre<Trip>) => void;
};

const defaultTrip: Pre<Trip> = {
  from: formattedDate(),
  to: formattedDate(),
};

export default function TripForm(props: Props) {
  const { trip, onSubmit } = props;

  const form = useForm({
    mode: "controlled",
    initialValues: { ...defaultTrip, ...trip },
    validate: {
      to: (value) => (value ? null : "Start date is required"),
      from: (value) => (value ? null : "End date is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <DateInput label="From" {...form.getInputProps("from")} />
      <DateInput label="To" {...form.getInputProps("to")} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
