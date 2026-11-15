"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShieldIcon,
  TrashIcon,
  TruckIcon,
} from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { categoryLabel } from "@/data/catalog";
import { formatNaira, SHIPPING_FLAT_RATE, SHIPPING_THRESHOLD } from "@/lib/format";

export default function CartPage() {
  const { cart, cartSubtotal, cartCount, hydrated, setQty, removeFromCart, clearCart } = useStore();
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  const shipping =
    cart.length === 0 || cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = cartSubtotal + shipping;

  return (
    <section className="bg-lime pb-16">
      <div className="shell pt-8 md:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase text-ink/45"
        >
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">Bag</span>
        </nav>

        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-ink/55">
              <span className="size-1.5 rounded-full bg-pink" /> Your selection
            </p>
            <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.5rem)]">
              Shopping bag<span className="text-pink">.</span>
            </h1>
          </div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-ink/55">
            {hydrated ? cartCount : 0} item{cartCount === 1 ? "" : "s"}
          </p>
        </div>

        {!hydrated ? (
          <div className="mt-10 h-64 animate-pulse rounded-2xl border border-ink/10 bg-paper/60" />
        ) : cart.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border-2 border-ink bg-paper px-6 py-16 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-lime">
              <BagIcon size={26} />
            </span>
            <div>
              <h2 className="display text-3xl">Your bag is empty</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
                Nothing here yet. Explore the SS26 collection and add your first piece.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/shop" className="btn btn-ink">
                Shop all products <ArrowRightIcon size={15} />
              </Link>
              <Link href="/wishlist" className="btn btn-outline">
                View wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-ink/15 bg-paper">
              <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-ink/10 px-5 py-3 text-[9px] font-bold tracking-[0.18em] uppercase text-ink/45 sm:grid">
                <span>Piece</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>
              <ul className="divide-y divide-ink/10">
                {cart.map((line) => (
                  <li key={line.key} className="flex gap-3 px-3 py-4 sm:items-center sm:gap-4 sm:px-5">
                    <Link
                      href={`/shop/${line.slug}`}
                      className="relative aspect-4/5 w-20 shrink-0 overflow-hidden rounded-lg bg-mist sm:w-24"
                    >
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.16em] text-ink/45 uppercase">
                            {categoryLabel(line.category)}
                          </p>
                          <Link
                            href={`/shop/${line.slug}`}
                            className="mt-0.5 block text-[13px] font-bold uppercase transition hover:text-pink"
                          >
                            {line.name}
                          </Link>
                          <p className="mt-1 text-[11px] text-ink/55">Size {line.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.key)}
                          aria-label={`Remove ${line.name} from bag`}
                          className="rounded p-1.5 text-ink/40 transition hover:text-pink"
                        >
                          <TrashIcon size={15} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-full border border-ink/20">
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                            className="flex size-8 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
                          >
                            <MinusIcon size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-bold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty + 1)}
                            aria-label={`Increase quantity of ${line.name}`}
                            className="flex size-8 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
                          >
                            <PlusIcon size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{formatNaira(line.price * line.qty)}</p>
                          <p className="text-[10px] text-ink/45">{formatNaira(line.price)} each</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-4 py-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase"
                >
                  <ArrowRightIcon size={13} className="rotate-180" /> Continue shopping
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[10px] font-semibold tracking-[0.14em] uppercase text-ink/45 transition hover:text-pink"
                >
                  Clear bag
                </button>
              </div>
            </div>

            <aside className="rounded-2xl border-2 border-ink bg-paper p-5 lg:sticky lg:top-[104px]">
              <h2 className="display text-2xl">Order summary</h2>

              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink/55">Subtotal</dt>
                  <dd className="font-semibold">{formatNaira(cartSubtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink/55">Delivery</dt>
                  <dd className="font-semibold">
                    {shipping === 0 ? <span className="text-pink">Free</span> : formatNaira(shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-base">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-bold">{formatNaira(total)}</dd>
                </div>
              </dl>

              <div className="mt-4 rounded-xl bg-lime px-3 py-2.5">
                {cartSubtotal >= SHIPPING_THRESHOLD ? (
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <CheckIcon size={13} /> Free delivery unlocked
                  </p>
                ) : (
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <TruckIcon size={13} className="text-pink" />
                    Add {formatNaira(SHIPPING_THRESHOLD - cartSubtotal)} for free delivery
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setCheckoutNotice(true)}
                className="btn btn-ink mt-4 w-full"
              >
                Checkout <ShieldIcon size={15} />
              </button>

              {checkoutNotice ? (
                <div
                  role="status"
                  className="mt-3 rounded-xl border border-pink bg-pink/10 p-3 text-[11.5px] leading-relaxed text-ink"
                >
                  <p className="font-bold tracking-[0.12em] uppercase">Demo storefront</p>
                  <p className="mt-1 text-ink/70">
                    Payments and order processing are not connected. Your bag is saved in this
                    browser so you can keep exploring. Newsletter and contact forms are live.
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-[10.5px] leading-relaxed text-ink/50">
                  Checkout is a demonstration. No card details are collected and no order is
                  created.
                </p>
              )}

              <ul className="mt-4 space-y-2 border-t border-ink/12 pt-4 text-[11px] text-ink/60">
                <li className="flex items-center gap-2">
                  <TruckIcon size={13} className="text-pink" /> Lagos next-day · Nigeria 2–4 days
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon size={13} className="text-pink" /> 14-day returns on unworn pieces
                </li>
              </ul>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
