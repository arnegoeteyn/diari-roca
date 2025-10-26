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

export type ID = number;

export type AppDate = string; // custom 'date' type since indexedDB has some difficulties with real date objects

export type Pre<T> = Omit<T, "id">;

export type Trip = {
  id: ID;
  from: AppDate;
  to: AppDate;
};
