'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { RoomId } from '@/lib/rooms'
import BookingPanel from './BookingPanel'

interface BookingContextValue {
  openBooking: (room?: RoomId) => void
}

const BookingContext = createContext<BookingContextValue>({ openBooking: () => {} })

export const useBooking = () => useContext(BookingContext)

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ room: RoomId } | null>(null)

  const openBooking = useCallback((room: RoomId = 'double') => setState({ room }), [])
  const close = useCallback(() => setState(null), [])

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {state && <BookingPanel initialRoom={state.room} onClose={close} />}
    </BookingContext.Provider>
  )
}
