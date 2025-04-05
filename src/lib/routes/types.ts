import { Url } from "url";

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

export type RouteWithAscents = {
  route: Route;
  ascents: Ascent[];
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
