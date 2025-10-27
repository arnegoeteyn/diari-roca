import { deleteSector as dbDeleteSector, ID } from "@/lib/routes";
import { setAction } from "./use-store";

import { deleteSector as cacheDeleteSector } from "@/lib/cache";

export const deleteSector = (set: setAction) => async (sectorId: ID) => {
  set((state) => {
    const updatedStoreData = cacheDeleteSector(state.store.data, sectorId);
    return {
      store: {
        ...state.store,
        data: updatedStoreData,
      },
    };
  });
  await dbDeleteSector(sectorId);
};
