import { Url } from "url";
import { SectorWithRouteCount } from "./sectors";

export type ID = number;

export type Pre<T> = Omit<T, "id">;

export enum RouteKind {
  Sport = "sport",
  Boulder = "boulder",
}

export type Route = {
  id: ID;
  sectorId: ID;
  name: string;
  grade: string;
  comment?: string;
  beta?: string;
  media: Media[];
  kind: RouteKind;
};

export type RouteOverview = {
  route: Route;
  ascents: Ascent[];
  sector: Sector;
  area: Area;
};

export type Media = {
  label?: string;
  link: Url;
};

export enum AscentKind {
  Onsight = "onsight",
  Repeat = "repeat",
  SecondGo = "secondgo",
  Redpoint = "redpoint",
}

export type Ascent = {
  id: ID;
  routeId: ID;
  comment?: string;
  date: string; // Date object does not seem to play well with indexdb
  kind: AscentKind;
};

export type Sector = {
  id: ID;
  areaId: ID;
  name: string;
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
