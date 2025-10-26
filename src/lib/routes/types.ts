import { Area } from "./areas";
import { Ascent } from "./ascents";
import { Route } from "./routes";
import { Sector } from "./sectors";

export type Store = {
  initialized: boolean;
  data: {
    areas: Map<ID, Area>;
    sectors: Map<ID, Sector>;
    routes: Map<ID, Route>;
    ascents: Map<ID, Ascent>;
    trips: Map<ID, Trip>;
  };
};

export type StoreData = Store["data"];

export function NewStoreData() {
  return {
    areas: new Map<ID, Area>(),
    sectors: new Map<ID, Sector>(),
    routes: new Map<ID, Route>(),
    ascents: new Map<ID, Ascent>(),
    trips: new Map<ID, Trip>(),
  } as StoreData;
}

export type ID = number;

export type AppDate = string; // custom 'date' type since indexedDB has some difficulties with real date objects

export type Pre<T> = Omit<T, "id">;

export type Trip = {
  id: ID;
  from: AppDate;
  to: AppDate;
};
