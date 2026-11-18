"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ROOMS, roomById, type RoomId } from "@/lib/rooms";
import {
  isNightTaken,
  isRangeFree,
  sameDay,
  startOfDay,
  stayTotal,
} from "@/lib/availability";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS_AHEAD = 12;
/** Five or more guests is a group enquiry rather than a room booking */
const GROUP_SIZE = 5;

const fmtMonth = (d: Date) =>
  d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const fmtDay = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
const fmtLong = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

interface Props {
  initialRoom: RoomId;
  onClose: () => void;
}

export default function BookingPanel({ initialRoom, onClose }: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [roomId, setRoomId] = useState<RoomId>(initialRoom);
  const [guests, setGuests] = useState(2);
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const room = roomById(roomId);
  const guestCount = guests;
  const isGroup = guests >= GROUP_SIZE;
  const fittingRooms = ROOMS.filter((r) => r.maxGuests >= guests);

  const changeGuests = (n: number) => {
    setGuests(n);
    const fit = ROOMS.find((r) => r.maxGuests >= n);
    if (fit && room.maxGuests < n) setRoomId(fit.id);
  };

  const chooseRoom = (id: RoomId) => {
    if (id === roomId) return;
    setRoomId(id);
  };

  // Focus, scroll lock, Escape and a simple focus trap while the panel is open.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  // A date can end the stay if every night between it and the check-in is free.
  const canCheckOut = (d: Date) =>
    !!checkIn && !checkOut && d > checkIn && isRangeFree(checkIn, d);

  const isDisabled = (d: Date) =>
    d < today || (isNightTaken(d) && !canCheckOut(d));

  const pick = (d: Date) => {
    if (isDisabled(d)) return;
    if (!checkIn || checkOut || d <= checkIn) {
      setCheckIn(d);
      setCheckOut(null);
    } else {
      setCheckOut(d);
    }
  };

  const stay =
    !isGroup && checkIn && checkOut ? stayTotal(room, checkIn, checkOut) : null;
  const previewEnd = checkOut ?? (hover && canCheckOut(hover) ? hover : null);

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(
    today.getFullYear(),
    today.getMonth() + MONTHS_AHEAD,
    1,
  );
  const shiftMonth = (n: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stay) setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-on-surface/50 backdrop-blur-xs animate-[fade-in_200ms_ease-out]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        className="relative bg-surface w-full md:max-w-4xl max-h-[94dvh] md:h-[min(660px,94dvh)] overflow-y-auto themed-scroll rounded-t-3xl md:rounded-3xl shadow-2xl outline-none animate-[sheet-up_280ms_ease-out]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {done && stay && checkIn && checkOut ? (
          <div className="p-8 md:p-14 text-center max-w-xl mx-auto">
            <span
              className="material-symbols-outlined text-primary text-6xl mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <h2
              id="booking-title"
              className="font-headline text-3xl text-primary mb-3"
            >
              Request received
            </h2>
            <p className="text-secondary leading-relaxed mb-8">
              Thank you, {name.split(" ")[0] || "guest"}. In a real booking we
              would confirm by email to {email}. This is a concept site, so
              nothing was sent or saved.
            </p>
            <div className="bg-surface-container-low rounded-2xl p-6 text-left text-sm space-y-3 mb-8">
              <Row label="Room" value={room.name} />
              <Row label="Arrive" value={`${fmtLong(checkIn)}, from 16:30`} />
              <Row label="Depart" value={`${fmtLong(checkOut)}, by 10:30`} />
              <Row label="Guests" value={String(guestCount)} />
              <Row
                label="Total"
                value={`£${stay.total}, breakfast included`}
                strong
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="bg-primary text-on-primary px-10 py-3.5 rounded-lg font-label text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[minmax(0,1fr)_300px] md:min-h-full">
            {/* Calendar */}
            <div className="p-6 md:p-8">
              <h2
                id="booking-title"
                className="font-headline text-3xl text-primary mb-1"
              >
                Check availability
              </h2>
              <p className="text-secondary text-sm mb-4">
                {isGroup
                  ? "Larger parties are arranged with us directly, so get in touch."
                  : !checkIn
                    ? "Choose your arrival date."
                    : !checkOut
                      ? "Now choose your departure date."
                      : "Happy with your dates? Add your details to request the stay."}
              </p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  disabled={month <= minMonth}
                  aria-label="Previous month"
                  className="absolute left-0 top-0 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container disabled:opacity-30 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  disabled={month >= maxMonth}
                  aria-label="Next month"
                  className="absolute right-0 top-0 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container disabled:opacity-30 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
                <div
                  className="grid sm:grid-cols-2 gap-8"
                  onMouseLeave={() => setHover(null)}
                >
                  {[0, 1].map((offset) => (
                    <MonthGrid
                      key={offset}
                      className={offset === 1 ? "hidden sm:block" : ""}
                      month={
                        new Date(
                          month.getFullYear(),
                          month.getMonth() + offset,
                          1,
                        )
                      }
                      today={today}
                      checkIn={checkIn}
                      previewEnd={previewEnd}
                      isDisabled={isDisabled}
                      isTaken={(d) => isNightTaken(d)}
                      onPick={pick}
                      onHover={setHover}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-outline">
                <Legend swatch="bg-primary" label="Your dates" />
                <Legend swatch="bg-primary-fixed" label="In your stay" />
                <Legend
                  swatch="bg-surface-container-highest line-through"
                  label="Booked"
                />
              </div>
              <p className="text-[11px] text-outline mt-3">
                Friday and Saturday nights are £15 more. Concept site: nothing
                is sent or saved.
              </p>
            </div>

            {/* Summary and details */}
            <form
              onSubmit={submit}
              className="bg-surface-container-low p-6 md:p-6 flex flex-col gap-3.5"
            >
              <div>
                <div className="text-[10px] font-label uppercase tracking-widest text-outline mb-1.5">
                  Guests
                </div>
                <div className="flex items-center justify-between bg-surface rounded-lg border border-outline-variant/40 px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => changeGuests(guests - 1)}
                    disabled={guests <= 1}
                    aria-label="Fewer guests"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container disabled:opacity-30 transition-colors"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span
                    className="text-sm text-primary font-medium"
                    aria-live="polite"
                  >
                    {guests >= GROUP_SIZE
                      ? `${GROUP_SIZE}+ guests`
                      : `${guests} ${guests === 1 ? "guest" : "guests"}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeGuests(guests + 1)}
                    disabled={guests >= GROUP_SIZE}
                    aria-label="More guests"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container disabled:opacity-30 transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              {isGroup ? (
                <GroupEnquiry />
              ) : (
                <>
                  <div role="radiogroup" aria-label="Room">
                    <div className="text-[10px] font-label uppercase tracking-widest text-outline mb-1.5">
                      Rooms for {guests} {guests === 1 ? "guest" : "guests"}
                    </div>
                    <div className="flex flex-col gap-2">
                      {fittingRooms.map((r) => {
                        const selected = r.id === roomId;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => chooseRoom(r.id)}
                            className={`text-left rounded-lg border px-3 py-2 transition-colors ${
                              selected
                                ? "border-primary bg-surface ring-1 ring-primary"
                                : "border-outline-variant/40 bg-surface hover:border-primary/50"
                            }`}
                          >
                            <div className="text-sm font-medium text-primary">
                              {r.name}
                            </div>
                            <div className="text-xs text-secondary">
                              {r.beds} · sleeps {r.maxGuests}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <DateBox label="Arrive" date={checkIn} />
                    <DateBox label="Depart" date={checkOut} />
                  </div>

                  <div
                    className="border-t border-outline-variant/30 pt-3 min-h-[4.5rem]"
                    aria-live="polite"
                  >
                    {stay ? (
                      <>
                        <div className="flex justify-between text-sm text-secondary">
                          <span>
                            {stay.nights}{" "}
                            {stay.nights === 1 ? "night" : "nights"}
                          </span>
                          <span>Breakfast included</span>
                        </div>
                        <div className="flex justify-between items-baseline mt-1">
                          <span className="font-headline text-primary text-lg">
                            Total
                          </span>
                          <span className="font-headline text-primary text-3xl">
                            £{stay.total}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-outline">
                        Pick your dates to see the total.
                      </p>
                    )}
                  </div>

                  {
                    <>
                      <input
                        disabled={!stay}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        aria-label="Your name"
                        autoComplete="name"
                        className="w-full bg-surface rounded-lg border border-outline-variant/40 px-3 py-2 text-sm disabled:opacity-50"
                      />
                      <input
                        disabled={!stay}
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        aria-label="Email address"
                        autoComplete="email"
                        className="w-full bg-surface rounded-lg border border-outline-variant/40 px-3 py-2 text-sm disabled:opacity-50"
                      />
                    </>
                  }

                  <button
                    type="submit"
                    disabled={!stay}
                    className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40"
                  >
                    Request this stay
                  </button>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-6">
      <span className="text-outline">{label}</span>
      <span
        className={`text-right ${strong ? "font-semibold text-primary" : "text-on-surface"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${swatch}`} />
      {label}
    </span>
  );
}

function DateBox({ label, date }: { label: string; date: Date | null }) {
  return (
    <div className="bg-surface rounded-lg border border-outline-variant/40 px-3 py-2">
      <div className="text-[10px] font-label uppercase tracking-widest text-outline">
        {label}
      </div>
      <div className={date ? "text-primary font-medium" : "text-outline"}>
        {date ? fmtDay(date) : "Select"}
      </div>
    </div>
  );
}

interface MonthGridProps {
  month: Date;
  today: Date;
  checkIn: Date | null;
  previewEnd: Date | null;
  isDisabled: (d: Date) => boolean;
  isTaken: (d: Date) => boolean;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
  className?: string;
}

function MonthGrid({
  month,
  today,
  checkIn,
  previewEnd,
  isDisabled,
  isTaken,
  onPick,
  onHover,
  className = "",
}: MonthGridProps) {
  const lead = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ];

  return (
    <div className={className}>
      <div className="text-center font-headline text-primary text-lg mb-3 h-9 flex items-center justify-center">
        {fmtMonth(month)}
      </div>
      <div className="grid grid-cols-7 text-center text-[10px] font-label uppercase tracking-wider text-outline mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`b${i}`} />;
          const disabled = isDisabled(d);
          const isStart = sameDay(d, checkIn);
          const isEnd = sameDay(d, previewEnd);
          const inRange =
            !!checkIn && !!previewEnd && d > checkIn && d < previewEnd;
          const taken = isTaken(d) && disabled && d >= today;
          const isToday = sameDay(d, today);

          let style = "text-on-surface hover:bg-surface-container-high";
          if (disabled)
            style = taken
              ? "text-outline/50 line-through bg-surface-container-highest/60"
              : "text-outline/40";
          if (inRange)
            style = "bg-primary-fixed text-on-primary-fixed rounded-none";
          if (isStart || isEnd) style = "bg-primary text-on-primary";

          return (
            <button
              key={d.getTime()}
              type="button"
              disabled={disabled}
              onClick={() => onPick(d)}
              onMouseEnter={() => onHover(d)}
              onFocus={() => onHover(d)}
              aria-label={`${fmtLong(d)}${taken ? ", booked" : ""}`}
              aria-pressed={isStart || isEnd}
              className={`h-9 text-sm rounded-full transition-colors disabled:cursor-not-allowed ${style} ${
                isToday && !isStart && !isEnd ? "ring-1 ring-primary/40" : ""
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GroupEnquiry() {
  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/40 p-5 text-sm">
      <span className="material-symbols-outlined text-tertiary text-3xl mb-2 block">
        groups
      </span>
      <h3 className="font-headline text-primary text-lg mb-2">
        Booking for a larger group?
      </h3>
      <p className="text-secondary leading-relaxed mb-4">
        For five or more guests we would rather arrange the rooms with you
        directly, so we can suit the whole party. Get in touch and we will sort
        it out.
      </p>
      <div className="flex flex-col gap-2">
        <a
          href="tel:+441632960123"
          className="flex items-center gap-3 text-primary font-medium hover:underline"
        >
          <span className="material-symbols-outlined text-lg">call</span>
          01632 960123
        </a>
        <a
          href="mailto:hello@alderfold.example"
          className="flex items-center gap-2 text-[13px] text-primary font-medium hover:underline"
        >
          <span className="material-symbols-outlined text-lg">mail</span>
          hello@alderfold.example
        </a>
      </div>
      <p className="text-[11px] text-outline mt-4">
        Concept site, so these are not real contact details.
      </p>
    </div>
  );
}
