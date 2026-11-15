import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowUpRightIcon } from "@/components/icons";

type SectionHeaderProps = {
  id?: string;
  number?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: { href: string; label: string; external?: boolean };
  className?: string;
};

export function SectionHeader({
  id,
  number,
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  action,
  className = "",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  const actionClasses = `group inline-flex shrink-0 items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] uppercase ${
    dark ? "text-lime" : "text-ink"
  }`;
  const actionIcon = (
    <span
      className={`flex size-9 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-pink group-hover:bg-pink group-hover:text-white ${
        dark ? "border-lime/40" : "border-ink"
      }`}
    >
      <ArrowUpRightIcon size={14} />
    </span>
  );

  return (
    <div
      className={`flex flex-col gap-5 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      } ${className}`}
    >
      <div className="max-w-2xl">
        <p
          className={`eyebrow flex items-center gap-2.5 ${centered ? "justify-center" : ""} ${
            dark ? "text-lime" : "text-ink/60"
          }`}
        >
          {number ? <span className="numeral">{number}</span> : null}
          <span className={`h-px w-6 ${dark ? "bg-lime/40" : "bg-ink/30"}`} />
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`display mt-4 text-[clamp(2.1rem,4.8vw,3.9rem)] ${dark ? "text-lime" : ""}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`serif-italic mt-3 text-[clamp(1.1rem,1.7vw,1.45rem)] ${
              dark ? "text-white/70" : "text-ink/65"
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? (
        action.external ? (
          <a
            href={action.href}
            target="_blank"
            rel="noreferrer noopener"
            className={actionClasses}
          >
            {action.label}
            {actionIcon}
          </a>
        ) : (
          <Link href={action.href} className={actionClasses}>
            {action.label}
            {actionIcon}
          </Link>
        )
      ) : null}
    </div>
  );
}
