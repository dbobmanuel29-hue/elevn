"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { ArrowRightIcon, CheckIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatNaira, SHIPPING_FLAT_RATE, SHIPPING_THRESHOLD } from "@/lib/format";

type PaymentMethod = "card" | "transfer";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartCount, hydrated, clearCart } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [completed, setCompleted] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  const shipping = cart.length === 0 || cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = cartSubtotal + shipping;

  useEffect(() => {
    if (!completed) return;
    const redirect = window.setTimeout(() => router.replace("/"), 4000);
    return () => window.clearTimeout(redirect);
  }, [completed, router]);

  function updateCustomer(field: keyof typeof customer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.length || completed) return;

    // Demo only: this simulates a successful payment. No money is collected.
    const reference = `ELV-DEMO-${Date.now().toString().slice(-8)}`;
    setOrderReference(reference);
    setCompleted(true);
    clearCart();
  }

  if (!hydrated) {
    return (
      <section className="min-h-[60vh] bg-lime py-16">
        <div className="shell">
          <div className="h-72 animate-pulse rounded-2xl bg-paper/60" />
        </div>
      </section>
    );
  }

  if (completed) {
    return (
      <section className="min-h-[70vh] bg-lime py-12 md:py-20">
        <div className="shell">
          <div className="mx-auto max-w-xl rounded-3xl border-2 border-ink bg-paper px-6 py-10 text-center sm:px-10">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-lime text-ink">
              <CheckIcon size={30} />
            </span>
            <p className="eyebrow mt-5 text-pink">Demo order complete</p>
            <h1 className="display mt-2 text-[clamp(2.2rem,6vw,3.8rem)]">
              Payment successful.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              Your demo checkout was completed successfully. This was a simulation only — no
              payment was processed and no real order was sent to ELEVN.
            </p>
            <div className="mt-6 rounded-xl border border-ink/15 bg-lime/50 p-4 text-left">
              <p className="text-[9px] font-bold tracking-[0.16em] text-ink/45 uppercase">
                Demo reference
              </p>
              <p className="mt-1 font-bold tracking-[0.08em]">{orderReference}</p>
              <p className="mt-2 text-[11px] text-ink/55">
                Method: {paymentMethod === "card" ? "Card (simulated)" : "Bank transfer (simulated)"}
              </p>
            </div>
            <Link href="/" className="btn btn-ink mt-7 w-full">
              Return to homepage <ArrowRightIcon size={15} />
            </Link>
            <p className="mt-3 text-[10px] text-ink/45">
              Your shopping bag has been cleared. Returning to the homepage shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="min-h-[60vh] bg-lime py-12 md:py-16">
        <div className="shell">
          <div className="mx-auto max-w-xl rounded-2xl border-2 border-ink bg-paper px-6 py-12 text-center">
            <h1 className="display text-3xl">Nothing to check out yet.</h1>
            <p className="mt-2 text-sm text-ink/60">Add a piece to your bag before continuing.</p>
            <Link href="/shop" className="btn btn-ink mt-6">Shop the collection</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-lime pb-16">
      <div className="shell pt-8 md:pt-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/cart" className="hover:text-ink">Bag</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">Checkout</span>
        </nav>

        <div className="mt-5">
          <p className="eyebrow text-ink/55">Almost yours</p>
          <h1 className="display mt-2 text-[clamp(2.5rem,6vw,4.8rem)]">Checkout<span className="text-pink">.</span></h1>
          <p className="mt-2 max-w-xl text-sm text-ink/55">
            Complete the demo checkout below. You can test card and bank transfer flows without entering real payment details.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <section className="rounded-2xl border border-ink/15 bg-paper p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="display text-2xl">Delivery details</h2>
                <span className="text-[9px] font-bold tracking-[0.15em] text-ink/40 uppercase">01 / 02</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 sm:col-span-2">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase">Full name</span>
                  <input required autoComplete="name" value={customer.fullName} onChange={(event) => updateCustomer("fullName", event.target.value)} className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none transition focus:border-pink" placeholder="Your full name" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase">Email address</span>
                  <input required type="email" autoComplete="email" value={customer.email} onChange={(event) => updateCustomer("email", event.target.value)} className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none transition focus:border-pink" placeholder="you@example.com" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase">Phone number</span>
                  <input required type="tel" autoComplete="tel" value={customer.phone} onChange={(event) => updateCustomer("phone", event.target.value)} className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none transition focus:border-pink" placeholder="+234 ..." />
                </label>
                <label className="grid gap-1.5 sm:col-span-2">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase">Delivery address</span>
                  <input required autoComplete="street-address" value={customer.address} onChange={(event) => updateCustomer("address", event.target.value)} className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none transition focus:border-pink" placeholder="House number, street and area" />
                </label>
                <label className="grid gap-1.5 sm:col-span-2">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase">City / State</span>
                  <input required autoComplete="address-level2" value={customer.city} onChange={(event) => updateCustomer("city", event.target.value)} className="h-12 rounded-xl border border-ink/20 bg-white px-3 text-sm outline-none transition focus:border-pink" placeholder="e.g. Lagos, Lagos State" />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-ink/15 bg-paper p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="display text-2xl">Payment method</h2>
                <span className="text-[9px] font-bold tracking-[0.15em] text-ink/40 uppercase">02 / 02</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => setPaymentMethod("card")} aria-pressed={paymentMethod === "card"} className={`rounded-xl border-2 p-4 text-left transition ${paymentMethod === "card" ? "border-ink bg-lime" : "border-ink/15 hover:border-ink/50"}`}>
                  <span className="block text-[11px] font-bold tracking-[0.12em] uppercase">Card payment</span>
                  <span className="mt-1 block text-[11px] text-ink/55">Simulated card checkout</span>
                </button>
                <button type="button" onClick={() => setPaymentMethod("transfer")} aria-pressed={paymentMethod === "transfer"} className={`rounded-xl border-2 p-4 text-left transition ${paymentMethod === "transfer" ? "border-ink bg-lime" : "border-ink/15 hover:border-ink/50"}`}>
                  <span className="block text-[11px] font-bold tracking-[0.12em] uppercase">Bank transfer</span>
                  <span className="mt-1 block text-[11px] text-ink/55">Simulated transfer confirmation</span>
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-pink/40 bg-pink/5 p-4">
                {paymentMethod === "card" ? (
                  <>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase">Card demo</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink/60">
                      In the live store, this option will connect to a payment gateway. For now, confirming below simulates a successful card payment. Do not enter card numbers or PINs.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase">Bank transfer demo</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink/60">
                      A real bank account is not connected yet. The button below simulates that a transfer has been received and confirmed. Do not send money to any account for this demo.
                    </p>
                  </>
                )}
              </div>
              <button type="submit" className="btn btn-ink mt-5 w-full">
                {paymentMethod === "card" ? "Confirm demo card payment" : "Confirm demo bank transfer"}
                <ShieldIcon size={15} />
              </button>
              <p className="mt-3 text-center text-[10px] leading-relaxed text-ink/45">
                DEMO MODE · No money is charged, no bank transfer is made and no real order is placed.
              </p>
            </section>
          </form>

          <aside className="rounded-2xl border-2 border-ink bg-paper p-5 lg:sticky lg:top-24">
            <h2 className="display text-2xl">Your order</h2>
            <p className="mt-1 text-[10px] tracking-[0.12em] text-ink/45 uppercase">{cartCount} item{cartCount === 1 ? "" : "s"}</p>
            <ul className="mt-4 divide-y divide-ink/10">
              {cart.map((line) => (
                <li key={line.key} className="flex gap-3 py-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-mist">
                    <Image src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase">{line.name}</p>
                    <p className="mt-1 text-[10px] text-ink/50">Size {line.size} · Qty {line.qty}</p>
                    <p className="mt-1 text-xs font-bold">{formatNaira(line.price * line.qty)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-2 border-t border-ink/15 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-ink/55">Subtotal</dt><dd className="font-semibold">{formatNaira(cartSubtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/55">Delivery</dt><dd className="font-semibold">{shipping === 0 ? "Free" : formatNaira(shipping)}</dd></div>
              <div className="flex justify-between border-t border-ink/15 pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-bold">{formatNaira(total)}</dd></div>
            </dl>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-ink/50">
              <TruckIcon size={14} className="text-pink" /> Delivery details are for demo preview only.
            </div>
            <Link href="/cart" className="mt-4 inline-flex text-[10px] font-bold tracking-[0.14em] uppercase hover:text-pink">
              Edit bag
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
