"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { useStore } from "@/components/store-provider";
import { formatNaira, SHIPPING_THRESHOLD } from "@/lib/format";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartCount, cartSubtotal, setQty, removeFromCart, hydrated } =
    useStore();

  const remaining = Math.max(0, SHIPPING_THRESHOLD - cartSubtotal);

  useEffect(() => {
    if (!cartOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [cartOpen]);

  return (
    <div
      className={`fixed inset-0 z-[75] ${cartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
      inert={!cartOpen}
    >
      <div
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-lime shadow-2xl transition-transform duration-400 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4">
          <div>
            <p className="eyebrow text-ink/50">Your selection</p>
            <h2 className="display mt-1 text-2xl">
              Bag <span className="text-pink">({hydrated ? cartCount : 0})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close bag"
            className="flex size-10 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-lime"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-ink/15 bg-paper">
              <BagIcon size={26} />
            </span>
            <div>
              <p className="display text-2xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-ink/60">
                Start with the pieces everyone is talking about this season.
              </p>
            </div>
            <Link href="/shop" onClick={() => setCartOpen(false)} className="btn btn-ink mt-2">
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartSubtotal < SHIPPING_THRESHOLD ? (
                <div className="mb-4 rounded-xl border border-ink/15 bg-paper p-3">
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                    {formatNaira(remaining)} away from free delivery
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-pink transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (cartSubtotal / SHIPPING_THRESHOLD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4 rounded-xl border border-ink bg-lime px-3 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  Free delivery unlocked
                </div>
              )}

              <ul className="divide-y divide-ink/10">
                {cart.map((line) => (
                  <li key={line.key} className="flex gap-3 py-4">
                    <Link
                      href={`/shop/${line.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="relative aspect-4/5 w-20 shrink-0 overflow-hidden rounded-lg bg-mist"
                    >
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${line.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="text-[12px] font-semibold tracking-[0.04em] uppercase hover:text-pink"
                        >
                          {line.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.key)}
                          aria-label={`Remove ${line.name}`}
                          className="shrink-0 rounded p-1 text-ink/40 transition hover:text-pink"
                        >
                          <TrashIcon size={15} />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[11px] text-ink/55">
                        {line.category} · Size {line.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-ink/20">
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                            className="flex size-7 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
                          >
                            <MinusIcon size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.key, line.qty + 1)}
                            aria-label={`Increase quantity of ${line.name}`}
                            className="flex size-7 items-center justify-center rounded-full transition hover:bg-ink hover:text-lime"
                          >
                            <PlusIcon size={12} />
                          </button>
                        </div>
                        <p className="text-xs font-bold">{formatNaira(line.price * line.qty)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/15 bg-paper px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="font-bold">{formatNaira(cartSubtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-ink/50">Delivery calculated at checkout.</p>
              <div className="mt-3 grid gap-2">
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="btn btn-ink w-full"
                >
                  View bag & checkout
                </Link>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase text-ink/50 transition hover:text-pink"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
