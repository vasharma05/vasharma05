import { EducationLogo } from "@/components/education-logo";
import { withBasePath } from "@/lib/base-path";
import type { EducationItem, Logo } from "@/lib/content-types";

type EducationGroup = {
  institution: string;
  location?: string;
  logo: Logo | null;
  items: EducationItem[];
};

export function EducationGroups({ items }: { items: EducationItem[] }) {
  const visibleItems = items.filter((item) => item.visible);
  const groups: EducationGroup[] = [];

  visibleItems.forEach((item) => {
    const logo = item.logo ?? null;
    const existing = groups.find((g) => g.institution === item.institution);
    if (existing) {
      existing.items.push(item);
      if (!existing.logo && logo) existing.logo = logo;
    } else {
      groups.push({
        institution: item.institution,
        location: item.location,
        logo,
        items: [item],
      });
    }
  });

  return (
    <>
      {groups.map((group, gIdx) => {
        const showLogo = group.logo?.visible && group.logo?.src && group.logo.src.trim() !== "";
        return (
          <article key={gIdx} className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {showLogo && (
              <EducationLogo
                src={withBasePath(group.logo!.src!)}
                alt={group.logo!.alt ?? group.institution ?? "Logo"}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                {group.institution}
              </h3>
              {group.location && (
                <p className="mt-1 text-base font-medium text-[var(--muted)]">{group.location}</p>
              )}
              <div className="mt-6 rounded-md bg-gradient-to-r from-sky-500/[0.06] to-transparent px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Progression
                </p>
                <ol className="mt-2 relative space-y-4">
                  <span
                    aria-hidden
                    className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-500/60 via-[var(--border)] to-transparent"
                  />
                  {group.items.map((item, i) => {
                    const isCurrent = i === 0;
                    const details = item.details?.filter((d) => d.visible) ?? [];
                    return (
                      <li key={i} className="relative pl-6">
                        <span
                          aria-hidden
                          className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                            isCurrent
                              ? "border-transparent bg-gradient-to-br from-sky-500 to-indigo-500"
                              : "border-[var(--border)] bg-[var(--background)]"
                          }`}
                        />
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span
                            className={`text-sm font-semibold ${
                              isCurrent ? "text-[var(--foreground)]" : "text-[var(--foreground)]/80"
                            }`}
                          >
                            {item.degree}
                          </span>
                          <span className="ml-auto text-xs font-medium tabular-nums text-[var(--muted)]">
                            {item.period}
                          </span>
                        </div>
                        {details.length > 0 && (
                          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-[var(--muted)]">
                            {details.map((d, di) => (
                              <li key={di}>{d.text}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
