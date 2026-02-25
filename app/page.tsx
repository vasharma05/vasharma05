import { ThemeToggle } from "@/components/theme-toggle";
import { ContactSection } from "@/components/contact-section";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  const {
    profile,
    navigation,
    hero,
    about,
    education,
    experience,
    skills,
    leadership,
    achievements,
    events,
    projects,
    contact,
  } = content;

  const filteredNav = navigation.filter((item) => item.visible);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="text-sm font-semibold tracking-tight text-[var(--foreground)]"
          >
            {profile.visible ? profile.name : "Portfolio"}
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-4 text-xs font-medium text-[var(--muted)] sm:flex">
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
        {/* Hero */}
        <section
          id="hero"
          className="section flex flex-col items-center gap-10 pt-16 sm:flex-row sm:items-start"
        >
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              {hero.visible ? hero.headline : "Hi, I’m"}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {hero.visible ? (
                <>
                  {hero.headline}{" "}
                  <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                    {hero.highlightName}
                  </span>
                </>
              ) : (
                profile.name
              )}
            </h1>
            <p className="max-w-xl text-sm text-[var(--muted)]">
              {hero.visible
                ? hero.subtitle
                : "Frontend engineer focused on building reliable, scalable interfaces."}
            </p>
            {hero.primaryCta.visible && (
              <div className="pt-2">
                <a
                  href={`#${hero.primaryCta.targetId}`}
                  className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {hero.primaryCta.label}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* About */}
        {about.visible && (
          <section id="about" className="section">
            <h2 className="section-title">{about.title}</h2>
            <div className="card mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row">
              <div className="flex-shrink-0 sm:w-40">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 opacity-90 sm:h-36 sm:w-36" />
              </div>
              <div className="flex-1 space-y-3 text-sm text-[var(--muted)]">
                {about.summaryItems
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <p key={idx}>{item.text}</p>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {education.visible && (
          <section id="education" className="section">
            <h2 className="section-title">Education</h2>
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {education.items
                .filter((item) => item.visible)
                .map((item, idx) => (
                  <article key={idx} className="card text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">
                        {item.degree}
                      </h3>
                      <span className="text-xs text-[var(--muted)]">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {item.institution} · {item.location}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
                      {item.details
                        .filter((d) => d.visible)
                        .map((d, i) => (
                          <li key={i}>{d.text}</li>
                        ))}
                    </ul>
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* Experience - vertical timeline */}
        {experience.visible && (
          <section id="experience" className="section">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              {experience.items
                .filter((item) => item.visible)
                .map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  const sideClass = isLeft
                    ? "timeline-item timeline-item-left"
                    : "timeline-item timeline-item-right";
                  return (
                    <div key={idx} className={sideClass}>
                      <div className="timeline-dot" />
                      <article className="timeline-card card text-sm">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold text-[var(--foreground)]">
                              {item.role}
                            </h3>
                            <p className="text-xs text-[var(--muted)]">
                              {item.company} · {item.location}
                            </p>
                          </div>
                          <span className="text-xs text-[var(--muted)]">
                            {item.period}
                          </span>
                        </div>
                        {item.primaryLink?.visible && (
                          <p className="mt-1 text-xs text-[var(--muted)]">
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
                        {"projects" in item && item.projects && (
                          <div className="mt-3 space-y-3">
                            {item.projects
                              .filter((p) => p.visible)
                              .map((p, i) => (
                                <div key={i}>
                                  <p className="text-xs font-semibold text-[var(--foreground)]">
                                    {p.name}
                                  </p>
                                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-[var(--muted)]">
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
                        {"highlights" in item && item.highlights && (
                          <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-[var(--muted)]">
                            {item.highlights
                              .filter((h) => h.visible)
                              .map((h, i) => (
                                <li key={i}>{h.text}</li>
                              ))}
                          </ul>
                        )}
                      </article>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.visible && (
          <section id="skills" className="section">
            <h2 className="section-title">Skills</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {skills.domains
                .filter((d) => d.visible)
                .map((domain) => (
                  <article key={domain.id} className="card text-sm">
                    <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                      {domain.label}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {domain.items
                        .filter((s) => s.visible)
                        .map((s, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-2.5 py-1 text-[var(--muted)]"
                          >
                            {s.label}
                          </span>
                        ))}
                    </div>
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* Leadership */}
        {leadership.visible && (
          <section id="leadership" className="section">
            <h2 className="section-title">Leadership</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {leadership.items
                .filter((item) => item.visible)
                .map((item, idx) => (
                  <article key={idx} className="card text-sm">
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {item.organization}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-[var(--muted)]">
                      {item.period}
                    </p>
                    <p className="mt-3 text-xs text-[var(--muted)]">
                      {item.description}
                    </p>
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.visible && (
          <section id="achievements" className="section">
            <h2 className="section-title">Achievements</h2>
            <div className="mx-auto flex max-w-3xl flex-col gap-3">
              {achievements.items
                .filter((item) => item.visible)
                .map((item, idx) => (
                  <article key={idx} className="card text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      {item.period && (
                        <span className="text-xs text-[var(--muted)]">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {item.issuer}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* Events */}
        {events.visible && (
          <section id="events" className="section">
            <h2 className="section-title">Events Attended</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {events.items
                .filter((item) => item.visible)
                .map((item, idx) => (
                  <article key={idx} className="card text-sm">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {item.type}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {item.location} · {item.date}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.visible && (
          <section id="projects" className="section">
            <h2 className="section-title">Projects</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {projects.items
                .filter((item) => item.visible)
                .map((item) => (
                  <article key={item.slug} className="card text-sm">
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {item.organization} · {item.role}
                    </p>
                    <p className="mt-3 text-xs text-[var(--muted)]">
                      {item.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem]">
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
        )}

        {/* Contact */}
        {contact.visible && (
          <ContactSection contact={contact} profile={profile} />
        )}
      </main>
    </div>
  );
}

