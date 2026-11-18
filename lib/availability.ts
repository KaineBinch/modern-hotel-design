import { WEEKEND_UPLIFT, type Room } from './rooms'

export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && a.getTime() === b.getTime()

const dayIndex = (d: Date) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000)

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 100
}

/**
 * Whether the night starting on this date is taken. This is pretend data: it is
 * derived from the date alone (the same for every room), so it looks the same on every visit. Nights
 * are taken in short runs so the calendar looks like real bookings.
 */
export function isNightTaken(d: Date) {
  return hash(`night:${Math.floor(dayIndex(d) / 3)}`) < 24
}

export function isRangeFree(from: Date, to: Date) {
  for (let d = from; d < to; d = addDays(d, 1)) {
    if (isNightTaken(d)) return false
  }
  return true
}

export function nightPrice(room: Room, d: Date) {
  const day = d.getDay()
  return room.price + (day === 5 || day === 6 ? WEEKEND_UPLIFT : 0)
}

export function stayTotal(room: Room, from: Date, to: Date) {
  let total = 0
  let nights = 0
  for (let d = from; d < to; d = addDays(d, 1)) {
    total += nightPrice(room, d)
    nights++
  }
  return { total, nights }
}
