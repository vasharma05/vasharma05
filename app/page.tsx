import { ThemeToggle } from "@/components/theme-toggle";
import { ContactSection } from "@/components/contact-section";
import { AboutSection } from "@/components/about-section";
import { ScrollDownArrow } from "@/components/scroll-down-arrow";
import { SkillsSection } from "@/components/skills-section";
import { SectionFade } from "@/components/section-fade";
import { Footer } from "@/components/footer";
import { HeroTitle } from "@/components/hero-title";
import { EducationLogo } from "@/components/education-logo";
import { HeroConnect } from "@/components/hero-connect";
import { AskSection } from "@/components/ask-section";
import { getContent } from "@/lib/content";
import { withBasePath } from "@/lib/base-path";

export default async function Home() {
  const content = await getContent();

  const {
    profile,
    socials,
    navigation,
    hero,
    about,
    education,
    experience,
    volunteer,
    skills,
    leadership,
    achievements,
    events,
    projects,
    contact,
  } = content;

  const filteredNav = navigation.filter(
    (item) => item.visible && (item.targetId !== "about" || about.visible),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg"
          >
            {profile.visible ? profile.name : "Portfolio"}
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-5 text-sm font-medium text-[var(--muted)] sm:flex">
              {filteredNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.targetId}`}
                  className="transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>
        {/* Hero - 90vh with scroll-down arrow */}
        <section
          id="hero"
          className="section flex min-h-[90vh] flex-col items-center justify-center gap-12 pt-20 sm:flex-row sm:items-center sm:justify-start sm:pt-0"
        >
          <div className="flex flex-1 flex-col items-center sm:items-start">
            <div className="space-y-6 text-center sm:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--muted)] sm:text-base">
                {hero.visible ? hero.headline : "Hi, I'm"}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl">
                {hero.visible ? (
                  hero.typewriter?.visible &&
                  Array.isArray(hero.typewriter.options) &&
                  hero.typewriter.options.length > 0 ? (
                    <HeroTitle
                      options={hero.typewriter.options}
                      className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent"
                    />
                  ) : (
                    <>
                      {hero.headline}{" "}
                      <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                        {hero.highlightName}
                      </span>
                    </>
                  )
                ) : (
                  profile.name
                )}
              </h1>
              <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg md:text-xl">
                {hero.visible
                  ? hero.subtitle
                  : "Frontend engineer focused on building reliable, scalable interfaces."}
              </p>
              {about.summaryItems?.filter((s: { visible: boolean }) => s.visible)
                ?.length > 0 && (
                <ul className="max-w-2xl list-none space-y-1.5 text-sm text-[var(--muted)] sm:text-base">
                  {about.summaryItems
                    .filter((s: { visible: boolean }) => s.visible)
                    .map((item: { text: string }, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                </ul>
              )}
              {(hero.primaryCta.visible ||
                ("connect" in hero &&
                  hero.connect?.visible &&
                  Array.isArray(hero.connect?.links) &&
                  (hero.connect as { links: { visible?: boolean }[] }).links.some(
                    (l) => l.visible,
                  ))) && (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {hero.primaryCta.visible && (
                    <>
                      {"resumeUrl" in hero.primaryCta &&
                      (hero.primaryCta as { resumeUrl?: string }).resumeUrl ? (
                        <a
                          href={withBasePath(
                            (hero.primaryCta as { resumeUrl: string }).resumeUrl,
                          )}
                          download
                          className="inline-flex items-center rounded-full border-2 border-[var(--foreground)] bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-md transition hover:bg-transparent hover:text-[var(--foreground)] dark:border-[var(--foreground)] dark:bg-[var(--foreground)] dark:text-[var(--background)] dark:hover:bg-transparent dark:hover:text-[var(--foreground)] sm:text-base"
                        >
                          {hero.primaryCta.label}
                        </a>
                      ) : (
                        <a
                          href={`#${hero.primaryCta.targetId}`}
                          className="inline-flex items-center rounded-full border-2 border-[var(--foreground)] bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-md transition hover:bg-transparent hover:text-[var(--foreground)] dark:border-[var(--foreground)] dark:bg-[var(--foreground)] dark:text-[var(--background)] dark:hover:bg-transparent dark:hover:text-[var(--foreground)] sm:text-base"
                        >
                          {hero.primaryCta.label}
                        </a>
                      )}
                    </>
                  )}
                  {"connect" in hero &&
                    hero.connect?.visible &&
                    Array.isArray(hero.connect?.links) &&
                    (hero.connect as { links: { visible?: boolean }[] }).links.some(
                      (l) => l.visible,
                    ) && (
                      <>
                        {hero.primaryCta.visible && (
                          <span
                            aria-hidden
                            className="h-8 w-px shrink-0 bg-[var(--border)]"
                          />
                        )}
                        <HeroConnect
                          label={(hero.connect as { label: string }).label}
                          links={
                            (hero.connect as {
                              links: { visible?: boolean; id: string; label: string; url: string }[];
                            }).links
                          }
                        />
                      </>
                    )}
                </div>
              )}
            </div>
          </div>
          <ScrollDownArrow targetId={about.visible ? "about" : "experience"} />
        </section>

        {/* About - with typewriter */}
        {about.visible && (
          <SectionFade>
            <AboutSection
              title={about.title}
              summaryItems={about.summaryItems}
            />
          </SectionFade>
        )}

        {/* Experience - vertical timeline */}
        {experience.visible && (
          <SectionFade>
            <section id="experience" className="section">
              <h2 className="section-title">Experience</h2>
              <div className="timeline">
                {experience.items
                  .filter((item) => item.visible)
                  .map((item, idx) => {
                    const expLogo =
                      "logo" in item &&
                      item.logo &&
                      typeof item.logo === "object"
                        ? (item.logo as {
                            visible?: boolean;
                            src?: string;
                            alt?: string;
                          })
                        : null;
                    const showExpLogo =
                      expLogo?.visible &&
                      expLogo?.src &&
                      expLogo.src.trim() !== "";
                    return (
                      <div key={idx} className="timeline-item timeline-item-right">
                        <div className="timeline-dot" />
                        <article className="timeline-card card experience-card text-base">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                            {showExpLogo && (
                              <EducationLogo
                                src={withBasePath(expLogo!.src!)}
                                alt={expLogo!.alt ?? item.company ?? "Logo"}
                                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                              />
                            )}
                            <div className="min-w-0 flex-1 space-y-0">
                              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                                    {item.company}
                                  </h3>
                                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                                    {item.location}
                                  </p>
                                </div>
                                <span className="text-sm font-medium text-[var(--muted)]">
                                  {item.period}
                                </span>
                              </div>
                          {item.primaryLink?.visible && (
                            <p className="border-t border-[var(--border)] pt-3 text-sm text-[var(--muted)]">
                              <a
                                href={item.primaryLink.url}
                                className="underline underline-offset-2"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.primaryLink.label}
                              </a>
                            </p>
                          )}
                          {"positions" in item && item.positions && (
                            <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--background)]/60 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                                Roles &amp; progression
                              </p>
                              <ul className="mt-3 space-y-3 text-sm text-[var(--muted)]">
                                {item.positions
                                  .filter((p) => p.visible)
                                  .map((p, i) => (
                                    <li
                                      key={i}
                                      className="border-l-2 border-[var(--border)] pl-3"
                                    >
                                      <div className="flex flex-col gap-1">
                                        <span className="inline-flex items-center gap-2 text-[var(--foreground)] font-semibold">
                                          <span className="rounded-full bg-[var(--foreground)]/5 px-2 py-0.5 text-xs uppercase tracking-wide">
                                            {p.type === "progression"
                                              ? "Progression"
                                              : "Role"}
                                          </span>
                                          {p.title}
                                        </span>
                                        <span className="text-xs font-medium text-[var(--muted)]">
                                          {p.period}
                                        </span>
                                      </div>
                                      {Array.isArray(p.responsibilities) &&
                                        p.responsibilities.length > 0 && (
                                          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-[var(--muted)]">
                                            {p.responsibilities.map(
                                              (r: { text?: string } | string, rIdx: number) => (
                                                <li key={rIdx}>
                                                  {typeof r === "string"
                                                    ? r
                                                    : r.text}
                                                </li>
                                              ),
                                            )}
                                          </ul>
                                        )}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                          {"projects" in item && item.projects && (
                            <div className="mt-5 space-y-5 border-t border-[var(--border)] pt-5">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                                Projects
                              </p>
                              {item.projects
                                .filter((p) => p.visible)
                                .map((p, i) => (
                                  <div key={i} className="space-y-2">
                                    <p className="text-sm font-semibold text-[var(--foreground)]">
                                      {p.name}
                                    </p>
                                    <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--muted)]">
                                      {p.highlights
                                        .filter((h) => h.visible)
                                        .map((h, j) => (
                                          <li key={j}>{h.text}</li>
                                        ))}
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          )}
                          {"highlights" in item &&
                            item.highlights &&
                            (() => {
                              const visibleHighlights = item.highlights.filter(
                                (h: { visible: boolean }) => h.visible,
                              );
                              if (!visibleHighlights.length) return null;

                              const previewCount = 3;
                              const primary = visibleHighlights.slice(
                                0,
                                previewCount,
                              );
                              const extra = visibleHighlights.slice(
                                previewCount,
                              );

                              return (
                                <div className="mt-5 space-y-2 border-t border-[var(--border)] pt-5">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                                    Highlights
                                  </p>
                                  <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--muted)]">
                                    {primary.map((h: { text: string }, i: number) => (
                                      <li key={i}>{h.text}</li>
                                    ))}
                                  </ul>
                                  {extra.length > 0 && (
                                    <details className="mt-2">
                                      <summary className="cursor-pointer text-xs font-medium text-[var(--foreground)]/80">
                                        Show more
                                      </summary>
                                      <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--muted)]">
                                        {extra.map((h: { text: string }, i: number) => (
                                          <li key={i + previewCount}>
                                            {h.text}
                                          </li>
                                        ))}
                                      </ul>
                                    </details>
                                  )}
                                </div>
                              );
                            })()}
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Volunteer */}
        {volunteer?.visible && volunteer?.items?.length > 0 && (
          <SectionFade>
            <section id="volunteer" className="section">
              <h2 className="section-title">Volunteer</h2>
              <div className="timeline">
                {volunteer.items
                  .filter((item: { visible: boolean }) => item.visible)
                  .map((item: Record<string, unknown>, idx: number) => {
                    const expLogo =
                      "logo" in item &&
                      item.logo &&
                      typeof item.logo === "object"
                        ? (item.logo as {
                            visible?: boolean;
                            src?: string;
                            alt?: string;
                          })
                        : null;
                    const showExpLogo =
                      expLogo?.visible &&
                      expLogo?.src &&
                      expLogo.src.trim() !== "";
                    return (
                      <div key={idx} className="timeline-item timeline-item-right">
                        <div className="timeline-dot" />
                        <article className="timeline-card card experience-card text-base">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                      {showExpLogo && (
                        <EducationLogo
                          src={withBasePath(expLogo!.src!)}
                          alt={expLogo!.alt ?? (item.company as string) ?? "Logo"}
                          className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        />
                      )}
                            <div className="min-w-0 flex-1 space-y-0">
                              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                                    {item.company as string}
                                  </h3>
                                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                                    {item.location as string}
                                  </p>
                                </div>
                                <span className="text-sm font-medium text-[var(--muted)]">
                                  {item.period as string}
                                </span>
                              </div>
                              {"primaryLink" in item &&
                                item.primaryLink &&
                                typeof item.primaryLink === "object" &&
                                (item.primaryLink as { visible?: boolean }).visible
                                  ? (
                                  <p className="border-t border-[var(--border)] pt-3 text-sm text-[var(--muted)]">
                                    <a
                                      href={(item.primaryLink as { url: string }).url}
                                      className="underline underline-offset-2"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {(item.primaryLink as { label: string }).label}
                                    </a>
                                  </p>
                                    )
                                  : null}
                              {"positions" in item &&
                                Array.isArray(item.positions) &&
                                (item.positions as { visible: boolean }[]).some((p) => p.visible) && (
                                  <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--background)]/60 px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                                      Roles &amp; progression
                                    </p>
                                    <ul className="mt-3 space-y-3 text-sm text-[var(--muted)]">
                                      {(item.positions as { visible: boolean; type?: string; title: string; period: string; responsibilities?: unknown[] }[])
                                        .filter((p) => p.visible)
                                        .map((p, i) => (
                                          <li
                                            key={i}
                                            className="border-l-2 border-[var(--border)] pl-3"
                                          >
                                            <div className="flex flex-col gap-1">
                                              <span className="inline-flex items-center gap-2 text-[var(--foreground)] font-semibold">
                                                <span className="rounded-full bg-[var(--foreground)]/5 px-2 py-0.5 text-xs uppercase tracking-wide">
                                                  {p.type === "progression"
                                                    ? "Progression"
                                                    : "Role"}
                                                </span>
                                                {p.title}
                                              </span>
                                              <span className="text-xs font-medium text-[var(--muted)]">
                                                {p.period}
                                              </span>
                                            </div>
                                            {Array.isArray(p.responsibilities) &&
                                              p.responsibilities.length > 0 && (
                                                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-[var(--muted)]">
                                                  {(p.responsibilities as ({ text?: string } | string)[]).map(
                                                    (r, rIdx) => (
                                                      <li key={rIdx}>
                                                        {typeof r === "string" ? r : r.text}
                                                      </li>
                                                    ),
                                                  )}
                                                </ul>
                                              )}
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                )}
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Education */}
        {education.visible && (
          <SectionFade>
            <section id="education" className="section">
              <h2 className="section-title">Education</h2>
              <div className="mx-auto flex max-w-3xl flex-col gap-10">
                {education.items
                  .filter((item) => item.visible)
                  .map((item, idx) => {
                    const logo =
                      "logo" in item && item.logo && typeof item.logo === "object"
                        ? (item.logo as {
                            visible?: boolean;
                            src?: string;
                            alt?: string;
                          })
                        : null;
                    const showLogo =
                      logo?.visible && logo?.src && logo.src.trim() !== "";
                    return (
                    <article
                      key={idx}
                      className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8"
                    >
                      {showLogo && (
                        <EducationLogo
                          src={withBasePath(logo!.src!)}
                          alt={logo!.alt ?? item.institution ?? "Logo"}
                          className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                            {item.degree}
                          </h3>
                          <span className="text-sm font-medium text-[var(--muted)]">
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-1 text-base font-medium text-[var(--muted)]">
                          {item.institution}
                          {item.location && ` · ${item.location}`}
                        </p>
                        {item.details?.filter((d: { visible: boolean }) => d.visible)
                          ?.length > 0 && (
                          <ul className="mt-4 space-y-2 border-l-2 border-[var(--border)] pl-4">
                            {item.details
                              .filter((d: { visible: boolean }) => d.visible)
                              .map((d: { text: string }, i: number) => (
                                <li
                                  key={i}
                                  className="text-base font-semibold text-[var(--foreground)]"
                                >
                                  {d.text}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  );
                  })}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Skills - 2-col grid, center align, Font Awesome icons */}
        {skills.visible && (
          <SectionFade>
            <SkillsSection title="Skills" domains={skills.domains} />
          </SectionFade>
        )}

        {/* Leadership - list view */}
        {leadership.visible && (
          <SectionFade>
            <section id="leadership" className="section">
              <h2 className="section-title">Leadership</h2>
              <ul className="mx-auto max-w-3xl list-none space-y-0 text-base">
                {leadership.items
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <li
                      key={idx}
                      className="border-b border-[var(--border)] py-4 last:border-b-0"
                    >
                      <h3 className="text-base font-semibold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">
                        {item.organization}
                        {item.period && ` · ${item.period}`}
                      </p>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {item.description}
                      </p>
                    </li>
                  ))}
              </ul>
            </section>
          </SectionFade>
        )}

        {/* Achievements - list view */}
        {achievements.visible && (
          <SectionFade>
            <section id="achievements" className="section">
              <h2 className="section-title">Achievements</h2>
              <ul className="mx-auto max-w-3xl list-none space-y-0 text-base">
                {achievements.items
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <li
                      key={idx}
                      className="border-b border-[var(--border)] py-4 last:border-b-0"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-[var(--foreground)]">
                          {item.title}
                        </h3>
                        {item.period && (
                          <span className="text-sm text-[var(--muted)]">
                            {item.period}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">
                        {item.issuer}
                      </p>
                      {item.description && (
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {item.description}
                        </p>
                      )}
                    </li>
                  ))}
              </ul>
            </section>
          </SectionFade>
        )}

        {/* Events */}
        {events.visible && (
          <SectionFade>
            <section id="events" className="section">
              <h2 className="section-title">Events Attended</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {events.items
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <article key={idx} className="card text-base">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                        {item.type}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {item.location} · {item.date}
                      </p>
                      {item.description && (
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {item.description}
                        </p>
                      )}
                    </article>
                  ))}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Projects */}
        {projects.visible && (
          <SectionFade>
            <section id="projects" className="section">
              <h2 className="section-title">Projects</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {projects.items
                  .filter((item) => item.visible)
                  .map((item) => (
                    <article key={item.slug} className="card text-base">
                      <h3 className="text-base font-semibold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {item.organization} · {item.role}
                      </p>
                      <p className="mt-3 text-sm text-[var(--muted)]">
                        {item.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                        {item.tags
                          .filter((t) => t.visible)
                          .map((t, idx) => (
                            <span
                              key={idx}
                              className="rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-2 py-0.5 text-[var(--muted)]"
                            >
                              {t.label}
                            </span>
                          ))}
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Ask (uses /api/ask; requires server: next dev / next start or Vercel) */}
        <SectionFade>
          <AskSection />
        </SectionFade>

        {/* Contact */}
        {contact.visible && (
          <SectionFade>
            <ContactSection contact={contact} profile={profile} />
          </SectionFade>
        )}
      </main>
      <Footer
        profileName={profile.visible ? profile.name : "Portfolio"}
        socials={content.socials}
      />
    </div>
  );
}
