"use client";

import { useEffect, useState, type FormEvent } from "react";

type Review = { name: string; rating: number; text: string; date: string };
const KEY = "elevn.demo.reviews.v1";
const starter: Review[] = [
  { name: "Amara O.", rating: 5, text: "The cut feels considered and easy to style. A strong everyday piece.", date: "Demo review" },
  { name: "Tobi K.", rating: 4, text: "Good fit and a clean finish. I would love to see more colour options.", date: "Demo review" },
];

export default function ReviewsPage() {
  const [reviews,setReviews] = useState<Review[]>(starter);
  const [name,setName] = useState("");
  const [rating,setRating] = useState("5");
  const [review,setReview] = useState("");
  const [saved,setSaved] = useState(false);
  useEffect(()=>{ try { const raw=localStorage.getItem(KEY); if(raw) setReviews(JSON.parse(raw) as Review[]); } catch {} },[]);
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(!name.trim() || review.trim().length<8) return;
    const next=[{name:name.trim(),rating:Number(rating),text:review.trim(),date:"Demo submission"},...reviews];
    setReviews(next); localStorage.setItem(KEY,JSON.stringify(next)); setName(""); setReview(""); setSaved(true);
  }
  return <main className="bg-paper"><section className="shell py-12 md:py-20"><p className="eyebrow text-ink/50">The ELEVN community</p><h1 className="display mt-3 text-[clamp(3rem,7vw,6rem)]">Worn. Lived in. Reviewed<span className="text-lime">.</span></h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">Customer feedback will appear here after verified reviews are enabled.</p><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]"><div className="space-y-3">{reviews.map((item,i)=><article key={item.name+i} className="rounded-2xl border border-ink/10 bg-white p-5"><div className="flex items-center justify-between gap-3"><p className="font-semibold">{item.name}</p><span className="text-sm tracking-widest text-ink">{ "★".repeat(item.rating)}<span className="text-ink/15">{"★".repeat(5-item.rating)}</span></span></div><p className="mt-3 text-sm leading-relaxed text-ink/65">{item.text}</p><p className="mt-4 text-[10px] uppercase tracking-widest text-ink/35">{item.date}</p></article>)}</div><form onSubmit={submit} className="h-fit rounded-2xl bg-ink p-6 text-white"><p className="eyebrow text-lime">Leave a note</p><h2 className="display mt-2 text-3xl">Your take matters.</h2><label className="mt-6 block text-xs text-white/65">Your name<input required value={name} onChange={e=>setName(e.target.value)} className="field mt-2 w-full bg-white text-ink" placeholder="Name" /></label><label className="mt-4 block text-xs text-white/65">Rating<select value={rating} onChange={e=>setRating(e.target.value)} className="field mt-2 w-full bg-white text-ink"><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Needs work</option></select></label><label className="mt-4 block text-xs text-white/65">Your review<textarea required minLength={8} value={review} onChange={e=>setReview(e.target.value)} className="field mt-2 min-h-28 w-full resize-y bg-white text-ink" placeholder="Tell us what you think..." /></label><button className="btn btn-ink mt-5 w-full" type="submit">Submit review</button>{saved?<p role="status" className="mt-3 text-xs text-lime">Your review has been saved on this device.</p>:null}<p className="mt-4 text-[10px] leading-relaxed text-white/40">Reviews are not yet verified or published to a central customer review system.</p></form></div></section></main>;
}