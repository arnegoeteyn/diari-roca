import { SectorWithRouteCount } from "./sectors";

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

export enum RouteKind {
  Sport = "sport",
  Boulder = "boulder",
}

export type RouteBody = {
  name: string;
  grade: string;
  comment?: string;
  beta?: string;
  media: Media[];
  kind: RouteKind;
};

export type Route = RouteBody & {
  id: ID;
  sectorId: ID;
};

export type RouteOverview = {
  route: Route;
  ascents: Ascent[];
  sector: Sector;
  area: Area;
};

export type Media = {
  label?: string;
  link: string;
};

export enum AscentKind {
  Onsight = "onsight",
  Flash = "flash",
  Repeat = "repeat",
  SecondGo = "secondgo",
  Redpoint = "redpoint",
}

export type AscentBody = {
  comment?: string;
  date: AppDate;
  kind: AscentKind;
};

export type Ascent = AscentBody & {
  id: ID;
  routeId: ID;
};

export type AscentOverview = {
  ascent: Ascent;
  route: Route;
  sector: Sector;
  area: Area;
};

export type Sector = {
  id: ID;
  areaId: ID;
  name: string;
};

export type SectorOverview = {
  routes: Route[];
  sector: Sector;
  area: Area;
};

export type Area = {
  id: ID;
  name: string;
  country: string;
};

export type AreaOverview = {
  area: Area;
  sectors: SectorWithRouteCount[];
};

export type Trip = {
  id: ID;
  from: AppDate;
  to: AppDate;
};
