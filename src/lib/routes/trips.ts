import { getDB } from "./db";
import { ID, Pre, StoreData, Trip } from "./types";

export async function addTrip(trip: Pre<Trip>): Promise<ID> {
  const db = await getDB();
  return db.add("trips", trip);
}

export async function putTrip(trip: Trip): Promise<ID> {
  const db = await getDB();
  return db.put("trips", trip);
}

export function getTrip(data: StoreData, id: ID): Trip {
  const trip = data.trips.get(id);

  if (!trip) {
    throw new Error("Trip does not exist");
  }

  return trip;
}

export function getTrips(data: StoreData): Trip[] {
  return [...data.trips.keys()].map((id) => getTrip(data, id));
}
