export type RoomId = "double" | "family" | "suite";

export interface Room {
  id: RoomId;
  name: string;
  /** Price per night in pounds, breakfast included */
  price: number;
  maxGuests: number;
  /** Sleeping arrangement, shown when choosing a room */
  beds: string;
}

export const ROOMS: Room[] = [
  {
    id: "double",
    name: "The Classic Double",
    price: 95,
    maxGuests: 2,
    beds: "One double bed",
  },
  {
    id: "family",
    name: "Family Studio",
    price: 120,
    maxGuests: 3,
    beds: "Three single beds",
  },
  {
    id: "suite",
    name: "The Heritage Family Suite",
    price: 165,
    maxGuests: 4,
    beds: "King bed and two singles",
  },
];

export const roomById = (id: RoomId) =>
  ROOMS.find((r) => r.id === id) ?? ROOMS[0];

/** Friday and Saturday nights cost this much more */
export const WEEKEND_UPLIFT = 15;
