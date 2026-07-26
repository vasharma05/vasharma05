"use client";

import type { SiteContent } from "@/lib/content";
import * as React from "react";

type ContactSectionProps = {
  contact: SiteContent["contact"];
  profile: SiteContent["profile"];
};

export function ContactSection({ contact, profile }: ContactSectionProps) {
  if (!contact.visible) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const subject = data.get("subject") || "";
    const company = data.get("company") || "";
    const message = data.get("message") || "";

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      "",
      "Message:",
      message,
    ];

    const body = lines.map((line) => encodeURIComponent(String(line))).join("%0A");

    const mailto = `mailto:${contact.mailto.to}?subject=${encodeURIComponent(
      contact.mailto.subjectPrefix + String(subject),
    )}&body=${body}`;

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">{contact.title}</h2>
      {contact.copy.visible && (
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {contact.copy.text}
        </p>
      )}

      <div className="max-w-2xl space-y-6">
        {contact.email.visible && (
          <p className="text-sm text-[var(--muted)]">
            Reach me at{" "}
            <a
              href={`mailto:${contact.email.address}`}
              className="text-[var(--foreground)] underline underline-offset-4"
            >
              {contact.email.address}
            </a>
            {profile.visible && (
              <>
                {" · "}
                Based in {profile.location}
              </>
            )}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {contact.form.fields
            .filter((field) => field.visible)
            .map((field) => (
              <div key={field.id} className="text-sm">
                <label
                  htmlFor={field.id}
                  className="mb-1 block font-medium text-[var(--foreground)]"
                >
                  {field.label}
                  {field.required && <span className="ml-0.5 text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    required={field.required}
                    className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--foreground)]"
                    rows={4}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.id}
                    name={field.id}
                    required={field.required}
                    className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--foreground)]"
                  >
                    <option value="">Select...</option>
                    {field.options
                      ?.filter((opt) => opt.visible)
                      .map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.required}
                    className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--foreground)]"
                  />
                )}
              </div>
            ))}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-2.5 text-sm font-semibold text-[var(--background)] shadow-sm transition hover:opacity-90"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
