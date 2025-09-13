import { Area } from "@/lib/routes";
import { Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormSector } from "./sector-form";

type Props = {
  form: UseFormReturnType<FormSector>;
  areas: Area[];
};

export default function SelectArea(props: Props) {
  return (
    <Select
      required
      disabled={props.areas.length == 1}
      searchable
      label="Area"
      data={props.areas.map((area) => ({
        value: area.id.toString(),
        label: area.name,
      }))}
      key={props.form.key("areaId")}
      {...props.form.getInputProps("areaId")}
    />
  );
}
