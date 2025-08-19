import { ID, SectorOverview } from "@/lib/routes";

export const sectorGroups = (sectors: SectorOverview[]) => {
  const groups = new Map<ID, SectorOverview[]>();
  sectors.forEach((sector) => {
    const group = groups.get(sector.area.id) || [];
    groups.set(sector.area.id, [...group, sector]);
  });

  return [...groups.values()]
    .sort((a, b) => a[0].area.name.localeCompare(b[0].area.name))
    .map((group) => ({
      group: group[0].area.name,
      items: group
        .sort((a, b) => a.sector.name.localeCompare(b.sector.name))
        .map((sector) => ({
          value: sector.sector.id.toString(),
          label: sector.sector.name,
        })),
    }));
};
