import { BrandIcon, hasBrandIcon } from "@/components/brand-icon";
import type { SkillDomain, SkillItem } from "@/lib/content-types";

type SkillsSectionProps = {
  title: string;
  domains: SkillDomain[];
};

type Group = { label: string; domainIds: string[] };

const GROUPS: Group[] = [
  { label: "Languages & Fundamentals", domainIds: ["core"] },
  {
    label: "Frontend",
    domainIds: ["frontend", "state-management", "ui-frameworks"],
  },
  { label: "Testing & Build", domainIds: ["testing", "tooling"] },
  { label: "Backend & Infrastructure", domainIds: ["backend", "devops"] },
  {
    label: "Collaboration & AI",
    domainIds: ["project-management", "ai-assistants"],
  },
  { label: "Soft Skills", domainIds: ["soft-skills"] },
];

export function SkillsSection({ title, domains }: SkillsSectionProps) {
  const byId = new Map(domains.filter((d) => d.visible).map((d) => [d.id, d]));

  const rows = GROUPS.map((g) => {
    const items: SkillItem[] = [];
    for (const id of g.domainIds) {
      const domain = byId.get(id);
      if (!domain) continue;
      for (const s of domain.items) {
        if (s.visible) items.push(s);
      }
    }
    return { label: g.label, items };
  }).filter((r) => r.items.length > 0);

  return (
    <section id="skills" className="section">
      <h2 className="section-title">{title}</h2>
      <dl className="divide-y divide-[var(--border)]">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-2 py-5 md:grid-cols-[12rem_1fr] md:gap-8">
            <dt className="text-sm font-semibold text-[var(--foreground)]">{row.label}</dt>
            <dd className="text-sm leading-relaxed text-[var(--muted)]">
              {row.items.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {hasBrandIcon(s.label) && (
                    <BrandIcon
                      label={s.label}
                      colorful
                      className="h-3.5 w-3.5 shrink-0 align-[-2px]"
                    />
                  )}
                  <span>{s.label}</span>
                  {i < row.items.length - 1 && (
                    <span aria-hidden className="mx-1 text-[var(--border)]">
                      •
                    </span>
                  )}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
