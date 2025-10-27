import { Pre, Route, RouteKind, ID } from "@/lib/routes";
import { Button, Group, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import SelectSector from "./select-sector";
import { SectorOverview } from "@/lib/cache";

type Props = {
  route?: Pre<Route>;
  sectors: SectorOverview[];
  onSubmit: (route: Pre<Route>) => void;
};

export type FormRoute = Required<
  Omit<Pre<Route>, "sectorId"> & { sectorId: string }
>;

const initialValuesFromRoute = (
  defaultSectorId: ID,
  route?: Pre<Route>,
): FormRoute => {
  const safeRoute: Pre<Route> = route
    ? route
    : {
        name: "",
        grade: "",
        kind: RouteKind.Sport,
        media: [],
        sectorId: defaultSectorId,
      };

  return {
    ...safeRoute,
    comment: route?.comment || "",
    beta: route?.beta || "",
    sectorId: safeRoute.sectorId.toString(),
  };
};

export default function RouteForm(props: Props) {
  const { route, sectors } = props;

  const form = useForm({
    mode: "controlled",
    initialValues: initialValuesFromRoute(sectors[0].sector.id, route),
    validate: {
      name: (value) => (value.length > 0 ? null : "Name can not be empty"),
      grade: (value) => (value ? null : "Grade is required"),
    },
  });

  const routeKindOptions = Object.values(RouteKind).map((kind) => ({
    value: kind,
    label: kind.charAt(0).toUpperCase() + kind.slice(1), // Capitalize the first letter
  }));

  const onSubmit = (
    route: Omit<Pre<Route>, "sectorId"> & { sectorId: string },
  ) => {
    const parsedId = Number(route.sectorId);
    props.onSubmit({ ...route, sectorId: parsedId });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        label="Name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Grade"
        key={form.key("grade")}
        {...form.getInputProps("grade")}
      />
      <Select
        label="Kind"
        placeholder="Pick one"
        data={routeKindOptions}
        {...form.getInputProps("kind")}
      />
      <Textarea
        autosize
        maxRows={7}
        minRows={1}
        label="Comment"
        key={form.key("comment")}
        {...form.getInputProps("comment")}
      />
      <Textarea
        autosize
        maxRows={7}
        minRows={2}
        label="Beta"
        key={form.key("beta")}
        {...form.getInputProps("beta")}
      />
      <SelectSector sectors={sectors} form={form} />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
