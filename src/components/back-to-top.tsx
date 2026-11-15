"use client";

import { useEffect, useState } from "react";

import { ArrowUpIcon } from "@/components/icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 left-5 z-[60] hidden size-11 items-center justify-center rounded-full border border-ink bg-lime text-ink shadow-[0_12px_30px_-16px_rgba(17,17,17,0.8)] transition-all duration-300 hover:bg-ink hover:text-lime sm:flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUpIcon size={16} />
    </button>
  );
}
