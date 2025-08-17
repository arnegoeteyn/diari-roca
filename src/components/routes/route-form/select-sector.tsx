import { SectorOverview } from "@/lib/routes/types";
import { sectorGroups } from "./route-form";
import { Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormRoute } from "./route-form.tsx";

type Props = {
  form: UseFormReturnType<FormRoute>;
  sectors: SectorOverview[];
};

export default function SelectSector(props: Props) {
  return (
    <Select
      disabled={props.sectors.length == 1}
      searchable
      label="Sector"
      data={sectorGroups(props.sectors)}
      key={props.form.key("sectorId")}
      {...props.form.getInputProps("sectorId")}
    />
  );
}
