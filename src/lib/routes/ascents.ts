import { getDB } from "./db";

import { AppDate, ID, Pre } from "./types";

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

export async function addAscent(ascent: Pre<Ascent>): Promise<ID> {
  const db = await getDB();
  return db.add("ascents", ascent);
}

export async function deleteAscent(id: ID): Promise<void> {
  const db = await getDB();
  return db.delete("ascents", id);
}
