type Social = { visible: boolean; id: string; label: string; url: string };

type FooterProps = {
  profileName: string;
  socials: Social[];
};

export function Footer({ profileName, socials }: FooterProps) {
  const visibleSocials = socials.filter((s) => s.visible);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="section flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          © {currentYear} {profileName}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {visibleSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              aria-label={social.label}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
