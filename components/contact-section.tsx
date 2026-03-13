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
    const projectType = data.get("projectType") || "";
    const budget = data.get("budget") || "";
    const timeline = data.get("timeline") || "";
    const message = data.get("message") || "";

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Project type: ${projectType}`,
      `Budget range: ${budget}`,
      `Timeline: ${timeline}`,
      "",
      "Message:",
      message,
    ];

    const body = lines
      .map((line) => encodeURIComponent(String(line)))
      .join("%0A");

    const mailto = `mailto:${contact.mailto.to}?subject=${encodeURIComponent(
      contact.mailto.subjectPrefix + String(subject),
    )}&body=${body}`;

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">{contact.title}</h2>
      {contact.copy.visible && (
        <p className="section-subtitle">{contact.copy.text}</p>
      )}
      <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row">
        <div className="card flex-1 text-base">
          <form onSubmit={handleSubmit} className="space-y-3">
            {contact.form.fields
              .filter((field) => field.visible)
              .map((field) => (
                <div key={field.id} className="text-sm">
                  <label
                    htmlFor={field.id}
                    className="mb-1 block font-medium text-[var(--foreground)]"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-0.5 text-red-500">*</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                      rows={4}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
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
                      className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                    />
                  )}
                </div>
              ))}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Send message
            </button>
          </form>
        </div>
        <div className="card flex-1 text-base">
          {contact.email.visible && (
            <p className="text-sm text-[var(--muted)]">
              Email{" "}
              <a
                href={`mailto:${contact.email.address}`}
                className="text-[var(--foreground)] underline underline-offset-2"
              >
                {contact.email.address}
              </a>{" "}
              or use the form. Submissions open your mail client and can be
              wired to a Google Sheet via Apps Script.
            </p>
          )}
          {profile.visible && (
            <p className="mt-4 text-sm text-[var(--muted)]">
              Based in {profile.location}. Open to remote and hybrid roles
              focused on frontend, microfrontends, and digital health.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

