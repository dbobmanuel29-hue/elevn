"use client";

import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] items-center bg-lime">
      <div className="shell py-16">
        <p className="eyebrow flex items-center gap-2 text-ink/55">
          <span className="size-1.5 rounded-full bg-pink" /> Something slipped
        </p>
        <h1 className="display mt-4 text-[clamp(2.6rem,9vw,6rem)]">
          The rail jammed<span className="text-pink">.</span>
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
          We hit an unexpected error loading this page. Try again, or head back to the collection.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-ink">
            Try again
          </button>
          <Link href="/shop" className="btn btn-outline">
            Shop all products <ArrowRightIcon size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
