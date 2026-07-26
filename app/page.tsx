import { SiteNav } from "@/components/site-nav";
import { TimelineItem } from "@/components/timeline-item";
import { ExperienceCard } from "@/components/experience-card";
import { ContactSection } from "@/components/contact-section";
import { AboutSection } from "@/components/about-section";
import { ScrollDownArrow } from "@/components/scroll-down-arrow";
import { SkillsSection } from "@/components/skills-section";
import { SectionFade } from "@/components/section-fade";
import { Footer } from "@/components/footer";
import { HeroTitle } from "@/components/hero-title";
import { HeroConnect } from "@/components/hero-connect";
import { EducationGroups } from "@/components/education-groups";
import { getContent } from "@/lib/content";
import { withBasePath } from "@/lib/base-path";
import { ProjectsGrid } from "@/components/projects-grid";

function extractStartYear(period: string | undefined): string | null {
  if (typeof period !== "string") return null;
  const match = period.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : null;
}

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

  const heroConnect = hero.connect;
  const heroConnectHasVisibleLinks =
    !!heroConnect?.visible &&
    Array.isArray(heroConnect.links) &&
    heroConnect.links.some((l) => l.visible !== false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav
        brand={profile.visible ? profile.name : "Portfolio"}
        items={filteredNav.map((n) => ({
          id: n.id,
          label: n.label,
          targetId: n.targetId,
        }))}
      />

      <main>
        {/* Hero - 90vh with scroll-down arrow */}
        <section
          id="hero"
          className="section flex min-h-[90vh] flex-col justify-center gap-10 pt-20 sm:gap-12 sm:pt-0"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-1 flex-col items-center sm:items-start">
              <div className="space-y-6 text-center sm:text-left">
                <p className="text-sm font-medium tracking-wide text-[var(--muted)] sm:text-base">
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
                {about.summaryItems?.filter((s) => s.visible)?.length > 0 && (
                  <ul className="max-w-2xl list-none space-y-1.5 text-sm text-[var(--muted)] sm:text-base">
                    {about.summaryItems
                      .filter((s) => s.visible)
                      .map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                  </ul>
                )}
                {(hero.primaryCta.visible || heroConnectHasVisibleLinks) && (
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:justify-start">
                    {hero.primaryCta.visible && (
                      <>
                        {hero.primaryCta.resumeUrl ? (
                          <a
                            href={withBasePath(hero.primaryCta.resumeUrl)}
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
                    {heroConnectHasVisibleLinks && heroConnect && (
                      <>
                        <HeroConnect label={heroConnect.label} links={heroConnect.links} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <ScrollDownArrow targetId={about.visible ? "about" : "experience"} />
          </div>
        </section>

        {/* About - with typewriter */}
        {about.visible && (
          <SectionFade>
            <AboutSection title={about.title} summaryItems={about.summaryItems} />
          </SectionFade>
        )}

        {/* Education */}
        {education.visible && (
          <SectionFade>
            <section id="education" className="section">
              <h2 className="section-title">Education</h2>
              <div className="flex flex-col gap-10">
                <EducationGroups items={education.items} />
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
                    return (
                      <TimelineItem
                        key={idx}
                        delayMs={Math.min(idx * 80, 320)}
                        year={extractStartYear(item.period)}
                      >
                        <ExperienceCard item={item} />
                      </TimelineItem>
                    );
                  })}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Projects */}
        {projects.visible && (
          <SectionFade>
            <section id="projects" className="section">
              <h2 className="section-title">Projects</h2>
              <ProjectsGrid items={projects.items} />
            </section>
          </SectionFade>
        )}

        {/* Volunteer */}
        {volunteer?.visible && volunteer?.items && volunteer.items.length > 0 && (
          <SectionFade>
            <section id="volunteer" className="section">
              <h2 className="section-title">Volunteer</h2>
              <div className="timeline">
                {volunteer.items
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <TimelineItem key={idx} delayMs={Math.min(idx * 80, 320)}>
                      <ExperienceCard item={item} />
                    </TimelineItem>
                  ))}
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

        {/* Leadership + Achievements side-by-side */}
        {(leadership.visible || achievements.visible) && (
          <SectionFade>
            <div className="section grid gap-10 md:grid-cols-2">
              {leadership.visible && (
                <section id="leadership">
                  <h2 className="section-title">Leadership</h2>
                  <ul className="list-none space-y-0 text-base">
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
                          <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>
                        </li>
                      ))}
                  </ul>
                </section>
              )}
              {achievements.visible && (
                <section id="achievements">
                  <h2 className="section-title">Achievements</h2>
                  <ul className="list-none space-y-0 text-base">
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
                              <span className="text-sm text-[var(--muted)]">{item.period}</span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-[var(--muted)]">{item.issuer}</p>
                          {item.description && (
                            <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>
                          )}
                        </li>
                      ))}
                  </ul>
                </section>
              )}
            </div>
          </SectionFade>
        )}

        {/* Events */}
        {events.visible && (
          <SectionFade>
            <section id="events" className="section">
              <h2 className="section-title">Events Attended</h2>
              <div className="grid gap-x-6 gap-y-0 md:grid-cols-2">
                {events.items
                  .filter((item) => item.visible)
                  .map((item, idx) => (
                    <article key={idx} className="card text-base">
                      <p className="text-xs font-semibold tracking-wide text-[var(--muted)]">
                        {item.type}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {item.location} · {item.date}
                      </p>
                      {item.description && (
                        <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>
                      )}
                    </article>
                  ))}
              </div>
            </section>
          </SectionFade>
        )}

        {/* Ask (uses /api/ask; requires server: next dev / next start or Vercel) */}
        {/* <SectionFade>
          <AskSection />
        </SectionFade> */}

        {/* Contact */}
        {contact.visible && (
          <SectionFade>
            <ContactSection contact={contact} profile={profile} />
          </SectionFade>
        )}
      </main>
      <Footer profileName={profile.visible ? profile.name : "Portfolio"} socials={socials} />
    </div>
  );
}
