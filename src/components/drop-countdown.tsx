"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRightIcon } from "@/components/icons";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

/** Drops land on Fridays at 10:00 — always returns the Friday after next. */
function nextDropDate(from: Date): Date {
  const target = new Date(from);
  let untilFriday = (5 - from.getDay() + 7) % 7;
  if (untilFriday === 0) untilFriday = 7;
  target.setDate(from.getDate() + untilFriday + 7);
  target.setHours(10, 0, 0, 0);
  return target;
}

function remaining(target: Date, now: Date): Parts {
  const total = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor(total / 3_600_000) % 24,
    minutes: Math.floor(total / 60_000) % 60,
    seconds: Math.floor(total / 1_000) % 60,
  };
}

export function DropCountdown() {
  const [target, setTarget] = useState<Date | null>(null);
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const date = nextDropDate(new Date());
    setTarget(date);
    setParts(remaining(date, new Date()));
    const timer = setInterval(() => setParts(remaining(date, new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  const tiles: { label: string; value: number | undefined }[] = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Minutes", value: parts?.minutes },
    { label: "Seconds", value: parts?.seconds },
  ];

  const dateLabel = target
    ? target.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "Friday";

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-ink bg-lime p-6 sm:p-9 md:p-12">
      <div
        aria-hidden="true"
        className="display outline-ink pointer-events-none absolute -right-6 -bottom-10 text-[clamp(8rem,24vw,22rem)] leading-none opacity-40 select-none"
      >
        02
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
        <div>
          <p className="eyebrow flex items-center gap-2.5 text-ink/60">
            <span className="numeral">08</span>
            <span className="h-px w-6 bg-ink/30" />
            Next release
          </p>
          <h2 id="drop-heading" className="display mt-4 text-[clamp(2.1rem,4.8vw,3.9rem)]">
            Drop 02 is
            <br />
            coming<span className="text-pink">.</span>
          </h2>
          <p className="serif-italic mt-3 max-w-md text-[clamp(1.1rem,1.7vw,1.45rem)] text-ink/70">
            Six new silhouettes. Two fabrics. One colourway you have not seen from us.
          </p>
          <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-ink/50 uppercase">
            {dateLabel} · 10:00 WAT
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a href="#newsletter" className="btn btn-ink">
              Get notified <ArrowRightIcon size={15} />
            </a>
            <Link href="/shop" className="btn btn-outline">
              Shop Drop 01
            </Link>
          </div>
        </div>

        <div
          role="timer"
          aria-live="off"
          aria-label="Countdown to Drop 02"
          className="grid grid-cols-4 gap-2 sm:gap-3"
        >
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-ink/15 bg-paper px-1.5 py-4 text-center sm:py-6"
            >
              <p className="display text-[clamp(1.8rem,5vw,4rem)] tabular-nums">
                {tile.value === undefined ? "--" : String(tile.value).padStart(2, "0")}
              </p>
              <p className="mt-1.5 text-[8.5px] font-bold tracking-[0.18em] text-ink/50 uppercase sm:text-[9px]">
                {tile.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="relative mt-6 text-[10.5px] text-ink/45">
        Demo release schedule — drops land Fridays at 10:00 WAT. Subscribers get a 24-hour head
        start.
      </p>
    </div>
  );
}
