'use client'

import type { RoomId } from '@/lib/rooms'
import { useBooking } from './BookingProvider'

interface Props {
  room?: RoomId
  className?: string
  children: React.ReactNode
}

/** A button that opens the availability panel, optionally with a room chosen. */
export default function BookButton({ room, className, children }: Props) {
  const { openBooking } = useBooking()
  return (
    <button type="button" onClick={() => openBooking(room)} className={className}>
      {children}
    </button>
  )
}
