import { Stack } from "@mantine/core";
import AddTripButton from "../trips/add-trip-buton";
import { useRoutesStore } from "@/hooks/store/use-store";

export default function AscentsActions() {
  const addTrip = useRoutesStore((store) => store.addTrip);
  return (
    <Stack p={"16px"}>
      <AddTripButton onTripCreated={(t) => addTrip(t).then()} />
    </Stack>
  );
}
