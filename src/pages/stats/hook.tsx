import { useRoutesStore } from "@/hooks/store/use-store";
import { StoreData } from "@/lib/routes";

export default function useStats(): StoreData {
  const store = useRoutesStore((store) => store.store.data);
  return store;
}
