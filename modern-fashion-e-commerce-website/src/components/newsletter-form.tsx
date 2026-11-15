"use client";

import { useState } from "react";

import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { isValidEmail } from "@/lib/format";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }
    if (!isValidEmail(value)) {
      setStatus("error");
      setMessage("That email doesn’t look right — check and try again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You’re on the list. Welcome to ELEVN.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error — please try again in a moment.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "loading") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="Enter your email"
          aria-invalid={status === "error"}
          aria-describedby="newsletter-message"
          className="field flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-ink shrink-0 sm:min-w-[160px]"
        >
          {status === "loading" ? "Joining…" : "Subscribe"}
          <ArrowRightIcon size={15} />
        </button>
      </div>

      <div id="newsletter-message" role="status" aria-live="polite" className="mt-3 min-h-5">
        {status === "error" ? (
          <p className="flex items-center gap-2 text-xs font-medium text-ink">
            <span className="flex size-4 items-center justify-center rounded-full bg-pink text-[9px] font-bold text-white">
              !
            </span>
            {message}
          </p>
        ) : null}
        {status === "success" ? (
          <p className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex size-4 items-center justify-center rounded-full bg-ink text-lime">
              <CheckIcon size={10} />
            </span>
            {message}
          </p>
        ) : null}
        {status === "idle" ? (
          <p className="text-xs text-ink/55">
            No spam. Early access, restocks and studio notes only.
          </p>
        ) : null}
      </div>
    </form>
  );
}
