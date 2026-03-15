"use client";

import { useState } from "react";

export function AskSection() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading) return;
    setError(null);
    setAnswer(null);
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${base}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setAnswer(data.answer ?? "");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ask" className="section">
      <h2 className="section-title">Ask about my experience</h2>
      <p className="section-subtitle mx-auto mb-6 max-w-xl text-center">
        Ask a question about my background, skills, or projects. Answers are
        based on my portfolio content.
      </p>
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What’s your experience with microfrontends?"
            className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
            disabled={loading}
            aria-label="Your question"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="shrink-0 rounded-lg border-2 border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-transparent hover:text-[var(--foreground)] disabled:opacity-50"
          >
            {loading ? "Asking…" : "Ask"}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        {answer !== null && (
          <div
            className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--foreground)]"
            role="status"
          >
            <p className="whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </section>
  );
}
