import { DateInput } from "@mantine/dates";

type Props = {};
export default function TripForm(props: Props) {
  return (
    <form>
      <DateInput label="From" />
      <DateInput label="To" />
    </form>
  );
}
