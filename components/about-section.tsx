import { TypewriterText } from "@/components/typewriter-text";
import type { AboutSummaryItem } from "@/lib/content-types";

type AboutSectionProps = {
  title: string;
  summaryItems: AboutSummaryItem[];
};

export function AboutSection({ title, summaryItems }: AboutSectionProps) {
  const visible = summaryItems.filter((item) => item.visible);
  const [first, ...rest] = visible;

  return (
    <section id="about" className="section">
      <h2 className="section-title">{title}</h2>
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex-shrink-0 sm:w-40">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 opacity-90 sm:h-36 sm:w-36" />
        </div>
        <div className="flex-1 space-y-3 text-sm text-[var(--muted)]">
          {first && (
            <p>
              <TypewriterText text={first.text} speed={35} />
            </p>
          )}
          {rest.map((item, idx) => (
            <p key={idx}>{item.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
