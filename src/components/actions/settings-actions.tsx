import { Button, Stack } from "@mantine/core";
import { useFileDialog } from "@mantine/hooks";
import { ParsedData, useRoutesStore } from "@/hooks/store/use-store";
import { StoreData } from "@/lib/routes";

function saveData(data: StoreData) {
  const parsed: ParsedData = {
    routes: [...data.routes.values()],
    areas: [...data.areas.values()],
    ascents: [...data.ascents.values()],
    sectors: [...data.sectors.values()],
    trips: [...data.trips.values()],
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(parsed, undefined, 4)], {
    type: "application/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = `routes-${currentDate}`;

  element.click();

  document.body.removeChild(element);
}

export default function SettingsActions() {
  const data = useRoutesStore((store) => store.store.data);
  const importStoreData = useRoutesStore((store) => store.importStoreData);

  const fileDialog = useFileDialog({
    multiple: false,
    accept: "application/json",
    onChange: async (files) => {
      if (files?.length != 1) {
        return;
      }

      const file = files[0];
      const fileReader = new FileReader();

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (e) => {
        if (!e.target) {
          return;
        }

        const parsed: ParsedData = JSON.parse(e.target.result as string);
        await importStoreData(parsed);
      };
    },
  });

  return (
    <Stack p={"16px"}>
      <Button onClick={() => saveData(data)}>Export</Button>
      <Button onClick={fileDialog.open}>Import</Button>
    </Stack>
  );
}
