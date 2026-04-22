"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MagneticButton } from "../ui/MagneticButton";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

const ContactBackdrop = dynamic(
  () => import("../three/ContactBackdrop").then((m) => m.ContactBackdrop),
  { ssr: false },
);

const INTEREST_OPTIONS = [
  "Website",
  "Mobile App",
  "Brand Identity",
  "3D / Motion",
  "AI Integration",
  "Other",
];

const BUDGETS = ["< $10k", "$10k — $25k", "$25k — $75k", "$100k+"];

export function Contact() {
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (v: string) =>
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(v)) { next.delete(v); } else { next.add(v); }
      return next;
    });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      interests: Array.from(interests),
      budget,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Unknown error.");
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 py-32 lg:py-48"
    >
      {/* 3D backdrop */}
      <div className="absolute inset-0 opacity-60">
        <ContactBackdrop />
      </div>

      {/* Atmospheric glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-neon-cyan/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[60vh] w-[60vh] rounded-full bg-neon-violet/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="08">Let's build something</SectionLabel>
            <RevealText
              as="h2"
              className="mt-8 font-display text-display-md text-white text-balance"
            >
              Tell us what you're making.
            </RevealText>

            <div className="mt-10 space-y-6 text-white/70">
              <p className="leading-relaxed">
                Send us a note about your project. We read every message and
                respond within two working days.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Phone
                  </span>
                  <span className="text-white">{SITE.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Email
                  </span>
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cursor="hover"
                    className="focus-ring text-white hover:text-neon-cyan"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Studio
                  </span>
                  <span className="text-white">{SITE.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-6 md:p-10"
            >
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-neon-cyan text-obsidian-1000">
                    ✓
                  </div>
                  <h3 className="font-display text-3xl text-white">
                    Thanks — we've got it.
                  </h3>
                  <p className="max-w-sm text-white/60">
                    We'll reply within two working days. In the meantime, grab
                    a coffee — you deserve it.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Name" name="name" placeholder="Ada Lovelace" required />
                    <Field label="Email" name="email" type="email" placeholder="ada@studio.com" required />
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                      I'm interested in
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((opt) => {
                        const active = interests.has(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            data-cursor="hover"
                            onClick={() => toggle(opt)}
                            aria-pressed={active}
                            className={cn(
                              "focus-ring rounded-full border px-4 py-2 text-sm transition-all",
                              active
                                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                                : "border-white/15 text-white/70 hover:border-white/35 hover:text-white",
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Budget
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          data-cursor="hover"
                          aria-pressed={budget === b}
                          onClick={() => setBudget((cur) => (cur === b ? null : b))}
                          className={cn(
                            "focus-ring rounded-full border px-4 py-2 text-sm transition-all",
                            budget === b
                              ? "border-neon-violet bg-neon-violet/10 text-neon-violet2"
                              : "border-white/15 text-white/70 hover:border-white/35 hover:text-white",
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field
                    label="Project details"
                    name="message"
                    as="textarea"
                    placeholder="What are you making? Timeline? Constraints?"
                    required
                  />

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                      We typically reply within 48h
                    </p>
                    <MagneticButton type="submit" size="lg" disabled={submitting}>
                      {submitting ? "Sending…" : "Send message →"}
                    </MagneticButton>
                  </div>
                  {error && (
                    <p className="rounded-xl border border-neon-magenta/30 bg-neon-magenta/10 px-4 py-3 text-sm text-neon-magenta">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  placeholder?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  type = "text",
  as = "input",
  placeholder,
  required,
}: FieldProps) {
  const base =
    "native-cursor peer w-full bg-transparent border-b border-white/15 pb-3 pt-7 text-white placeholder:text-transparent focus:border-neon-cyan focus:outline-none transition-colors";

  return (
    <label className="relative block">
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          required={required}
          className={cn(base, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={base}
        />
      )}
      <span className="pointer-events-none absolute left-0 top-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-all peer-placeholder-shown:top-[2.1rem] peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-neon-cyan">
        {label}
      </span>
    </label>
  );
}
