import Link from "next/link";

import { ArrowRightIcon, SearchIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-lime">
      <div className="shell py-16">
        <p className="eyebrow flex items-center gap-2 text-ink/55">
          <span className="size-1.5 rounded-full bg-pink" /> Error 404
        </p>
        <h1 className="display mt-4 text-[clamp(3rem,12vw,9rem)]">
          Off the rail<span className="text-pink">.</span>
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
          That page is not in the collection. It may have sold out, moved, or never existed. The good
          pieces are still one click away.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link href="/shop" className="btn btn-ink">
            Shop all products <ArrowRightIcon size={15} />
          </Link>
          <Link href="/" className="btn btn-outline">
            <SearchIcon size={15} /> Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
