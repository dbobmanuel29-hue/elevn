"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CheckIcon, CloseIcon, HeartIcon } from "@/components/icons";
import type { Product } from "@/data/catalog";

export type CartLine = {
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string;
  qty: number;
};

export type WishlistItem = Product;

type Toast = {
  id: number;
  title: string;
  description?: string;
  tone: "ink" | "pink";
};

type AddOptions = { qty?: number; size?: string; silent?: boolean };

type StoreValue = {
  hydrated: boolean;
  cart: CartLine[];
  wishlist: WishlistItem[];
  recentlyViewed: Product[];
  cartCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  quickView: Product | null;
  setCartOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToCart: (product: Product, options?: AddOptions) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (slug: string) => boolean;
  trackView: (product: Product) => void;
  notify: (title: string, description?: string, tone?: Toast["tone"]) => void;
};

const CART_KEY = "elevn.cart.v1";
const WISHLIST_KEY = "elevn.wishlist.v1";
const RECENT_KEY = "elevn.recent.v1";
const RECENT_LIMIT = 8;

const StoreContext = createContext<StoreValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — state stays in memory */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setCart(readStorage<CartLine[]>(CART_KEY, []));
    setWishlist(readStorage<WishlistItem[]>(WISHLIST_KEY, []));
    setRecentlyViewed(readStorage<Product[]>(RECENT_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(RECENT_KEY, recentlyViewed);
  }, [recentlyViewed, hydrated]);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const notify = useCallback(
    (title: string, description?: string, tone: Toast["tone"] = "ink") => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((current) => [...current.slice(-2), { id, title, description, tone }]);
      const timer = setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 3600);
      timers.current.push(timer);
    },
    [],
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, options?: AddOptions) => {
      const qty = Math.max(1, Math.min(options?.qty ?? 1, 10));
      const size = options?.size ?? product.sizes?.[0] ?? "One size";
      const key = `${product.slug}::${size}`;

      setCart((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key ? { ...line, qty: Math.min(line.qty + qty, 10) } : line,
          );
        }
        return [
          ...current,
          {
            key,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size,
            qty,
          },
        ];
      });

      if (!options?.silent) {
        notify("Added to bag", `${product.name} · ${size}`, "ink");
      }
    },
    [notify],
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((current) => current.filter((line) => line.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((current) =>
      current
        .map((line) => (line.key === key ? { ...line, qty: Math.max(0, Math.min(qty, 10)) } : line))
        .filter((line) => line.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      let added = false;
      setWishlist((current) => {
        const exists = current.some((item) => item.slug === product.slug);
        if (exists) {
          return current.filter((item) => item.slug !== product.slug);
        }
        added = true;
        return [...current, product];
      });

      if (added) {
        notify("Saved to wishlist", product.name, "pink");
      } else {
        notify("Removed from wishlist", product.name, "ink");
      }
    },
    [notify],
  );

  const isWishlisted = useCallback(
    (slug: string) => wishlist.some((item) => item.slug === slug),
    [wishlist],
  );

  const trackView = useCallback((product: Product) => {
    setRecentlyViewed((current) => {
      const rest = current.filter((item) => item.slug !== product.slug);
      return [product, ...rest].slice(0, RECENT_LIMIT);
    });
  }, []);

  const openQuickView = useCallback((product: Product) => setQuickView(product), []);
  const closeQuickView = useCallback(() => setQuickView(null), []);

  const cartCount = useMemo(() => cart.reduce((total, line) => total + line.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((total, line) => total + line.qty * line.price, 0),
    [cart],
  );

  useEffect(() => {
    document.body.dataset.cartOpen = cartOpen ? "true" : "false";
  }, [cartOpen]);

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      cart,
      wishlist,
      recentlyViewed,
      cartCount,
      cartSubtotal,
      cartOpen,
      quickView,
      setCartOpen,
      openQuickView,
      closeQuickView,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      trackView,
      notify,
    }),
    [
      hydrated,
      cart,
      wishlist,
      recentlyViewed,
      cartCount,
      cartSubtotal,
      cartOpen,
      quickView,
      openQuickView,
      closeQuickView,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      trackView,
      notify,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-3 bottom-3 z-[90] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-toast pointer-events-auto flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3.5 shadow-[0_16px_40px_-24px_rgba(17,17,17,0.6)] sm:w-80 ${
              toast.tone === "pink"
                ? "border-ink bg-pink text-white"
                : "border-ink bg-ink text-white"
            }`}
          >
            <span
              className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
                toast.tone === "pink" ? "bg-white text-pink" : "bg-lime text-ink"
              }`}
            >
              {toast.tone === "pink" ? <HeartIcon size={14} filled /> : <CheckIcon size={15} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 truncate text-xs text-white/70">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="-mr-1 rounded-full p-1 text-white/60 transition hover:text-white"
            >
              <CloseIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
