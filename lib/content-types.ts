// Central content types for public/content.json.
// Kept intentionally permissive on optional keys so the JSON authoring
// surface is friendly, while consumers get real narrowing.

export type Visible = { visible: boolean };
export type MaybeVisible = { visible?: boolean };

export type VisibleText = { visible: boolean; text: string };
export type MaybeVisibleText = { visible?: boolean; text: string };

export type Logo = { visible?: boolean; src?: string; alt?: string };

export type Site = Visible & {
  domain: string;
  title: string;
  description: string;
  language: string;
  canonicalPath: string;
};

export type Profile = Visible & {
  name: string;
  tagline?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: Logo;
};

export type Social = Visible & {
  id: string;
  label: string;
  url: string;
  username?: string;
};

export type NavItem = Visible & { id: string; label: string; targetId: string };

export type ConnectLink = { visible?: boolean; id: string; label: string; url: string };

export type HeroTypewriter = { visible?: boolean; options: string[] };

export type HeroPrimaryCta = {
  visible: boolean;
  label: string;
  targetId: string;
  resumeUrl?: string;
};

export type HeroConnect = {
  visible?: boolean;
  label: string;
  links: ConnectLink[];
};

export type Hero = Visible & {
  headline: string;
  highlightName: string;
  subtitle: string;
  typewriter?: HeroTypewriter;
  primaryCta: HeroPrimaryCta;
  connect?: HeroConnect;
};

export type AboutSummaryItem = Visible & { text: string };

export type About = MaybeVisible & {
  visible: boolean;
  title: string;
  summaryItems: AboutSummaryItem[];
};

export type EducationItem = Visible & {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  logo?: Logo;
  details?: VisibleText[];
};

export type Education = Visible & { items: EducationItem[] };

export type Responsibility = string | { visible?: boolean; text?: string };

export type Position = Visible & {
  type?: string;
  title: string;
  period: string;
  responsibilities?: Responsibility[];
};

export type JumpLinkItem = Visible & { slug: string; label: string };

export type PrimaryLink = { visible?: boolean; url: string; label: string };

export type ExperienceItem = Visible & {
  company?: string;
  role?: string;
  subtitle?: string;
  location?: string;
  period?: string;
  summary?: string;
  logo?: Logo;
  primaryLink?: PrimaryLink;
  secondaryLinks?: PrimaryLink[];
  projectJumpLinks?: {
    visible?: boolean;
    heading?: string;
    items?: JumpLinkItem[];
  };
  positions?: Position[];
  highlights?: VisibleText[];
  techStackUsed?: string[];
};

export type Experience = Visible & { items: ExperienceItem[] };

export type Volunteer = MaybeVisible & { items?: ExperienceItem[] };

export type SkillItem = Visible & { label: string };
export type SkillDomain = Visible & { id: string; label: string; items: SkillItem[] };
export type Skills = Visible & { domains: SkillDomain[] };

export type LeadershipItem = Visible & {
  title: string;
  organization: string;
  period?: string;
  description: string;
};
export type Leadership = Visible & { items: LeadershipItem[] };

export type AchievementItem = Visible & {
  title: string;
  issuer: string;
  period?: string;
  description?: string;
};
export type Achievements = Visible & { items: AchievementItem[] };

export type EventItem = Visible & {
  title: string;
  type: string;
  location: string;
  date: string;
  description?: string;
};
export type Events = Visible & { items: EventItem[] };

// Note: some entries in content.json store `visible` as string "true".
export type ProjectTag = { visible?: boolean | string; label: string };
export type ProjectItem = MaybeVisible & {
  slug: string;
  title: string;
  role: string;
  organization: string;
  summary: string;
  highlights?: VisibleText[];
  tags: ProjectTag[];
  links?: { visible?: boolean; label: string; url: string }[];
  thumbnail?: Logo;
  image?: Logo;
};
export type Projects = Visible & { items: ProjectItem[] };

export type ContactFieldOption = Visible & { value: string; label: string };
export type ContactField = Visible & {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: ContactFieldOption[];
};
export type Contact = Visible & {
  title: string;
  email: { visible: boolean; address: string };
  copy: { visible: boolean; text: string };
  mailto: {
    visible: boolean;
    to: string;
    subjectPrefix: string;
    bodyTemplateHint?: string;
  };
  form: { visible: boolean; fields: ContactField[] };
};

export type ReferenceItem = Visible & {
  name: string;
  role: string;
  email: string;
};
export type References = MaybeVisible & { items?: ReferenceItem[] };

export type SiteContent = {
  site: Site;
  profile: Profile;
  socials: Social[];
  navigation: NavItem[];
  hero: Hero;
  about: About;
  education: Education;
  experience: Experience;
  volunteer: Volunteer;
  skills: Skills;
  leadership: Leadership;
  achievements: Achievements;
  events: Events;
  references?: References;
  projects: Projects;
  contact: Contact;
};
