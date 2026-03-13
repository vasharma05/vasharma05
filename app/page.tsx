import { ThemeToggle } from "@/components/theme-toggle";
import { ContactSection } from "@/components/contact-section";
import { AboutSection } from "@/components/about-section";
import { ScrollDownArrow } from "@/components/scroll-down-arrow";
import { SkillsSection } from "@/components/skills-section";
import { SectionFade } from "@/components/section-fade";
import { Footer } from "@/components/footer";
import { HeroTitle } from "@/components/hero-title";
import { getContent } from "@/lib/content";

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
              {hero.primaryCta.visible && (
                <div className="pt-2">
                  {"resumeUrl" in hero.primaryCta &&
                  (hero.primaryCta as { resumeUrl?: string }).resumeUrl ? (
                    <a
                      href={
                        (hero.primaryCta as { resumeUrl: string }).resumeUrl
                      }
                      download
                      className="inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:text-base"
                    >
                      {hero.primaryCta.label}
                    </a>
                  ) : (
                    <a
                      href={`#${hero.primaryCta.targetId}`}
                      className="inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:text-base"
                    >
                      {hero.primaryCta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <ScrollDownArrow targetId="about" />
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

        {/* Education */}
        {education.visible && (
          <SectionFade>
            <section id="education" className="section">
              <h2 className="section-title">Education</h2>
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {education.items
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <article key={idx} className="card text-base">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-[var(--foreground)]">
                          {item.degree}
                        </h3>
                        <span className="text-sm text-[var(--muted)]">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {item.institution} · {item.location}
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
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
                    const isLeft = idx % 2 === 0;
                    const sideClass = isLeft
                      ? "timeline-item timeline-item-left"
                      : "timeline-item timeline-item-right";
                    return (
                      <div key={idx} className={sideClass}>
                        <div className="timeline-dot" />
                        <article className="timeline-card card text-base">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div>
                              <h3 className="text-base font-semibold text-[var(--foreground)]">
                                {item.role}
                              </h3>
                              <p className="text-sm text-[var(--muted)]">
                                {item.company} · {item.location}
                              </p>
                            </div>
                            <span className="text-sm text-[var(--muted)]">
                              {item.period}
                            </span>
                          </div>
                          {item.primaryLink?.visible && (
                            <p className="mt-1 text-sm text-[var(--muted)]">
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
                                    <p className="text-sm font-semibold text-[var(--foreground)]">
                                      {p.name}
                                    </p>
                                    <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-[var(--muted)]">
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
                            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[var(--muted)]">
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
