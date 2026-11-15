"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { BagIcon, CheckIcon, HeartIcon, UserIcon } from "@/components/icons";
import { useStore, type DemoMember } from "@/components/store-provider";

type DemoAccount = { name:string; email:string; password:string };
const ACCOUNTS_KEY="elevn.demo.accounts.v1";

function AccountContent(){
 const {member,signInDemo,signOutDemo,hydrated}=useStore();
 const router=useRouter();
 const params=useSearchParams();
 const [mode,setMode]=useState<"signup"|"login">(params.get("mode")==="login"?"login":"signup");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [confirm,setConfirm]=useState("");
 const [error,setError]=useState("");
 const [busy,setBusy]=useState(false);

 useEffect(()=>{const requested=params.get("mode");if(requested==="login"||requested==="signup")setMode(requested);},[params]);

 function continueAfterAuth(){
  const target=window.sessionStorage.getItem("elevn.auth.returnTo")||"/";
  window.sessionStorage.removeItem("elevn.auth.returnTo");
  router.replace(target.startsWith("/")&&!target.startsWith("//")?target:"/");
 }
 function readAccounts():DemoAccount[]{try{return JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY)||"[]") as DemoAccount[]}catch{return [];}}
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setError("");
  const normalized=email.trim().toLowerCase();
  if(mode==="signup"){
   if(password.length<6){setError("Use at least 6 characters for this demo password.");return;}
   if(password!==confirm){setError("Your passwords do not match.");return;}
   const accounts=readAccounts();
   if(accounts.some(item=>item.email===normalized)){setError("An account with this email already exists. Please sign in.");return;}
   const account={name:name.trim(),email:normalized,password};
   window.localStorage.setItem(ACCOUNTS_KEY,JSON.stringify([...accounts,account]));
   signInDemo({name:account.name,email:account.email,provider:"email"});
  }else{
   const account=readAccounts().find(item=>item.email===normalized&&item.password===password);
   if(!account){setError("We couldn't match those demo details. Check your email and password, or create an account.");return;}
   signInDemo({name:account.name,email:account.email,provider:"email"});
  }
  setBusy(true);
  window.setTimeout(continueAfterAuth,120);
 }
 function googleDemo(){
  setError("");
  const googleMember:DemoMember={name:"Google Demo Member",email:"google.member@elevn.demo",provider:"google"};
  signInDemo(googleMember);
  setBusy(true);
  window.setTimeout(continueAfterAuth,120);
 }
 if(!hydrated)return <section className="min-h-[65vh] bg-lime py-16"><div className="shell"><div className="mx-auto h-96 max-w-xl animate-pulse rounded-2xl bg-paper/60"/></div></section>;

 if(member)return <section className="min-h-[65vh] bg-lime pb-16"><div className="shell max-w-3xl pt-10"><p className="eyebrow text-ink/55">ELEVN members</p><div className="mt-3 rounded-3xl border-2 border-ink bg-paper p-6 sm:p-9"><span className="flex size-14 items-center justify-center rounded-full bg-lime"><CheckIcon size={25}/></span><p className="eyebrow mt-5 text-pink">Signed in · Demo account</p><h1 className="display mt-2 text-4xl">Welcome, {member.name.split(" ")[0]}<span className="text-pink">.</span></h1><p className="mt-2 text-sm text-ink/60">{member.email}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href="/shop" className="btn btn-ink">Explore the collection</Link><Link href="/cart" className="btn btn-outline"><BagIcon size={15}/> Your shopping bag</Link></div><button type="button" onClick={signOutDemo} className="mt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55 underline underline-offset-4 hover:text-pink">Sign out</button></div><p className="mt-4 text-[10px] leading-relaxed text-ink/45">Demo account only. Your member session is stored in this browser. Real authentication and Google OAuth will be connected when the backend is added.</p></div></section>;

 return <section className="min-h-[70vh] bg-lime pb-16"><div className="shell max-w-6xl pt-8 md:pt-10"><nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink/45"><Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Member account</span></nav><div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14"><div><p className="eyebrow flex items-center gap-2 text-ink/55"><UserIcon size={13} className="text-pink"/> The ELEVN community</p><h1 className="display mt-3 text-[clamp(2.7rem,6vw,5rem)]">Good things<br/>are for <span className="text-pink">members.</span></h1><p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">Create your ELEVN member account to add pieces to your bag and continue to checkout. Your demo account stays available in this browser.</p><ul className="mt-6 space-y-3 text-xs text-ink/65"><li className="flex items-center gap-2"><CheckIcon size={14} className="text-pink"/> Member-only shopping bag</li><li className="flex items-center gap-2"><HeartIcon size={14} className="text-pink"/> Keep your wishlist close</li><li className="flex items-center gap-2"><BagIcon size={14} className="text-pink"/> Get ready for future order history</li></ul></div>
 <div className="rounded-3xl border-2 border-ink bg-paper p-5 sm:p-8"><div className="grid grid-cols-2 rounded-full border border-ink/15 bg-lime/60 p-1"><button type="button" onClick={()=>{setMode("signup");setError("");}} className={`rounded-full py-3 text-[10px] font-bold uppercase tracking-[0.14em] ${mode==="signup"?"bg-ink text-lime":"text-ink/55"}`}>Create account</button><button type="button" onClick={()=>{setMode("login");setError("");}} className={`rounded-full py-3 text-[10px] font-bold uppercase tracking-[0.14em] ${mode==="login"?"bg-ink text-lime":"text-ink/55"}`}>Sign in</button></div><h2 className="display mt-6 text-3xl">{mode==="signup"?"Join ELEVN.":"Welcome back."}</h2><p className="mt-1 text-xs text-ink/55">{mode==="signup"?"Create your demo member profile.":"Sign in to your demo member profile."}</p>
 <form onSubmit={submit} className="mt-5 space-y-3">{mode==="signup"&&<label className="grid gap-1.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em]">Full name</span><input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="Your name" className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none focus:border-pink"/></label>}<label className="grid gap-1.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em]">Email address</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none focus:border-pink"/></label><label className="grid gap-1.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em]">Password</span><input required type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} autoComplete={mode==="signup"?"new-password":"current-password"} placeholder="At least 6 characters" className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none focus:border-pink"/></label>{mode==="signup"&&<label className="grid gap-1.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em]">Confirm password</span><input required type="password" minLength={6} value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password" placeholder="Enter password again" className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none focus:border-pink"/></label>}{error&&<p role="alert" className="rounded-lg border border-pink/40 bg-pink/5 p-3 text-xs text-pink">{error}</p>}<button disabled={busy} className="btn btn-ink w-full disabled:opacity-60">{mode==="signup"?"Create demo account":"Sign in to ELEVN"}</button></form>
 <div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-ink/15"/><span className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/40">or</span><span className="h-px flex-1 bg-ink/15"/></div><button type="button" onClick={googleDemo} disabled={busy} className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-ink/20 bg-white text-xs font-bold transition hover:border-ink hover:bg-lime disabled:opacity-60"><span className="text-lg font-black">G</span> Continue with Google <span className="text-[9px] font-medium text-ink/40">(demo)</span></button><p className="mt-4 text-[10px] leading-relaxed text-ink/45">Demo mode only: account details are saved in this browser and are not securely authenticated. Do not use a real password. Google sign-in is a visual demo and does not connect to Google. A secure backend and OAuth integration will be added later.</p></div></div></div></section>;
}
export default function AccountPage(){return <Suspense fallback={<section className="min-h-[60vh] bg-lime"/>}><AccountContent/></Suspense>;}
