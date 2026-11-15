"use client";

import { useState } from "react";

import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { isValidEmail } from "@/lib/format";

type Status = "idle" | "loading" | "success" | "error";

const TOPICS = ["Order support", "Sizing", "Press", "Wholesale", "Something else"];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update = (field: keyof typeof form) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "loading") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setStatus("error");
      setFeedback("Please share your name.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }
    if (form.message.trim().length < 10) {
      setStatus("error");
      setFeedback("Tell us a little more — at least 10 characters.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `[${topic}] ${form.message}`,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback(data.message ?? "Message received. We’ll reply shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Network error — please try again in a moment.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border-2 border-ink bg-paper p-5 sm:p-7"
    >
      <p className="eyebrow text-ink/50">Send a message</p>
      <h2 className="display mt-2 text-[clamp(1.6rem,3.4vw,2.4rem)]">Talk to the studio</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[10px] font-bold tracking-[0.16em] uppercase">
            Your name
          </label>
          <input
            id="contact-name"
            value={form.name}
            onChange={(event) => update("name")(event.target.value)}
            autoComplete="name"
            className="field"
            placeholder="Amaka Obi"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[10px] font-bold tracking-[0.16em] uppercase">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={(event) => update("email")(event.target.value)}
            autoComplete="email"
            className="field"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1.5 text-[10px] font-bold tracking-[0.16em] uppercase">Topic</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTopic(item)}
              aria-pressed={topic === item}
              className={`rounded-full border-[1.5px] px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase transition ${
                topic === item
                  ? "border-ink bg-ink text-lime"
                  : "border-ink/20 hover:border-pink hover:text-pink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-1.5 block text-[10px] font-bold tracking-[0.16em] uppercase">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message")(event.target.value)}
          className="w-full resize-y rounded-2xl border-[1.5px] border-ink/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-ink focus:bg-white"
          placeholder="How can we help?"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "loading"} className="btn btn-ink w-full sm:w-auto">
          {status === "loading" ? "Sending…" : "Send message"}
          <ArrowRightIcon size={15} />
        </button>
        <p className="max-w-xs text-[10.5px] leading-relaxed text-ink/50">
          Live form: messages are stored in the store database. We reply within one business day.
        </p>
      </div>

      <div role="status" aria-live="polite" className="min-h-5">
        {status === "success" ? (
          <p className="mt-2 flex items-center gap-2 text-xs font-semibold">
            <span className="flex size-4 items-center justify-center rounded-full bg-ink text-lime">
              <CheckIcon size={10} />
            </span>
            {feedback}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-2 flex items-center gap-2 text-xs font-medium">
            <span className="flex size-4 items-center justify-center rounded-full bg-pink text-[9px] font-bold text-white">
              !
            </span>
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
