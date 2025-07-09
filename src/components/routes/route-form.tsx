import { Pre, Route, RouteKind, Sector, ID } from "@/lib/routes/types";
import { Button, Group, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  route?: Pre<Route>;
  sectors: Sector[];
  onSubmit: (route: Pre<Route>) => void;
};

type FormRoute = Required<Omit<Pre<Route>, "sectorId"> & { sectorId: string }>;

const initialValuesFromRoute = (
  defaultSectorId: ID,
  route?: Pre<Route>
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
    comment: "",
    beta: "",
    sectorId: safeRoute.sectorId.toString(),
  };
};

export default function RouteForm(props: Props) {
  const { route, sectors } = props;

  const form = useForm({
    mode: "controlled",
    initialValues: initialValuesFromRoute(sectors[0].id, route),
    validate: {
      name: (value) => (value.length > 0 ? null : "Name can not be empty"),
    },
  });

  const sectorData = props.sectors.map((sector) => ({
    value: sector.id.toString(),
    label: sector.name,
  }));

  const onSubmit = (
    route: Omit<Pre<Route>, "sectorId"> & { sectorId: string }
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
      <Select
        label="Sector"
        data={sectorData}
        key={form.key("sectorId")}
        {...form.getInputProps("sectorId")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
