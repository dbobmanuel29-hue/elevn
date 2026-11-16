import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size guide",
  description: "Find your fit with the ELEVN clothing size guide.",
};

const rows = [
  ["XS", "84–88", "64–68", "88–92"],
  ["S", "89–93", "69–73", "93–97"],
  ["M", "94–98", "74–78", "98–102"],
  ["L", "99–104", "79–84", "103–108"],
  ["XL", "105–110", "85–90", "109–114"],
];

export default function SizeGuidePage() {
  return (
    <main className="bg-paper">
      <section className="shell py-12 md:py-20">
        <p className="eyebrow text-ink/50">Find your fit · ELEVN</p>
        <h1 className="display mt-3 max-w-3xl text-[clamp(2.8rem,7vw,6rem)]">The right fit changes everything<span className="text-lime">.</span></h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/65">Use this general body-measurement guide as a starting point. Product-specific fit notes take priority. Measurements are in centimetres and are not garment measurements.</p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-ink text-white"><tr>{["Size","Chest","Waist","Hip"].map(x=><th key={x} className="px-5 py-4 text-xs uppercase tracking-widest">{x} (cm)</th>)}</tr></thead>
            <tbody>{rows.map((row,i)=><tr key={row[0]} className={i%2===0?"bg-lime/15":"bg-white"}>{row.map((cell,j)=><td key={j} className="border-b border-ink/5 px-5 py-4 font-medium">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[["Chest","Measure around the fullest part of your chest, keeping the tape level."],["Waist","Measure around your natural waist without pulling the tape tight."],["Hip","Measure around the fullest part of your hips while standing naturally."]].map(([title,copy])=><article key={title} className="rounded-2xl border border-ink/10 p-5"><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-ink/60">{copy}</p></article>)}
        </div>
        <p className="mt-8 text-sm text-ink/60">Between sizes? Choose the larger size for a relaxed fit. For product-specific advice, <Link className="font-semibold underline underline-offset-4" href="/contact">contact the studio</Link>.</p>
      </section>
    </main>
  );
}