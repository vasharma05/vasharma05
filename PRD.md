# Product Requirements Document: Frontend Developer Portfolio Website

**Version:** 1.2  
**Status:** In development / Implemented  
**Last updated:** February 2025

---

## 1. Overview

A single-page portfolio website built with **Next.js (App Router)** and **Tailwind CSS** for a frontend developer. The product should feel premium and modern, with a **dark / light theme toggle** (icon button on the primary navigation bar). The initial theme should follow **system settings**, and thereafter the user’s choice (**light ↔ dark**) is persisted in `localStorage`.  
All content (copy, links, lists) should be loaded from a single **runtime-fetched JSON file** and can be customized by editing that JSON.

---

## 2. Design Direction

- **Visual style**: Flat, minimal, card-based design (no liquid glass / heavy glassmorphism).
- **Color**:
  - Dark and light themes with a clean, high-contrast palette.
  - Subtle gradients are allowed for accents and CTAs, but surfaces remain mostly flat.
- **Layout**:
  - Clear visual hierarchy, generous spacing, easy-to-scan sections.
  - Cards for Experience, Events, Projects; list view for Leadership and Achievements; Skills use dividers (no cards).
- **Motion**:
  - Smooth scroll between sections.
  - Subtle fade/slide-in on scroll (no blur-based animations).
- **Inspiration / references**:
  - To be collected: 3–5 example portfolio sites with flat/minimal design for reference (to be curated during implementation).

---

## 3. Page Structure (Single Page)

All sections live on one page with smooth scroll navigation.

### 3.1 Hero / Navigation Bar

- Sticky top nav.
- **Left:** Name or logo (links to hero/top); larger type for prominence.
- **Center/Right:** Navigation links: About, Experience, Skills, Leadership, Achievements, Events, Projects, Contact. **Smooth scroll** to corresponding section on click.
- **CTA:** “Hire Me” button: when `resumeUrl` is set in `content.json` it **downloads the resume**; otherwise scrolls to Contact.
- **Social:** LinkedIn, GitHub, Twitter/X as icons (with accessible labels).
- **Mobile:** Hamburger menu for nav and social.

### 3.2 Hero Section

- **Height:** Min 90% viewport height (90vh); content vertically centered with scroll-down affordance.
- Large greeting headline with animated gradient text: e.g. “Hi, I’m <name>” — **large, responsive typography** (scales up to ~7xl on large screens).
- Short tagline (e.g. Frontend Developer focus from JSON file); **increased font size** for readability.
- **Scroll indicator:** Vertical arrow + “Scroll” label below hero, linking to About section (smooth scroll).
- CTA button sized for prominence (larger padding and text).
- Background: Subtle animated gradient orbs or mesh (CSS-only; no blur animation for performance).

### 3.3 About Me

- Brief bio paragraph with **typewriter effect** on the first paragraph (client-side component).
- Profile photo/avatar (placeholder or image).
- Tech stack as “glowing” pills/badges with specific logo (e.g. React, TypeScript, Tailwind, etc.).
- Layout: responsive (e.g. stacked on mobile, side-by-side on desktop).

### 3.4 Skills

- **Layout:** No cards; **dividers** between the two columns and between subsections within each column. Two-column grid on desktop, stacked on mobile.
- **Flow:** Subsections from `content.json` flow **left-to-right** (alternating columns: 1st domain left, 2nd right, 3rd left, etc.).
- Subdivided by **domains** (e.g. Frontend, Backend & Data, Tools & Workflow, Testing & Quality). Each domain: **center-aligned** title + list of skills as pills/badges.
- **Icons:** **Font Awesome** (solid + brands) for skill pills where a mapping exists; default icon for unmapped skills.
- **Spacing:** Generous padding (section, between divider and title, between subsections); larger pill padding and gap between pills; subsection titles and pills use larger type to avoid a cramped feel.
- All content loaded from `content.json`.

### 3.5 Experience (Timeline)

- Vertical timeline with alternating left/right cards (or stacked on mobile).
- Each entry: company name, role, date range, short description.
- Connecting line with accent; dots at each step.
- All entries loaded from `content.json`.

### 3.6 Leadership

- **List view** (no cards): single column, max-width container; items separated by bottom borders.
- Each: role title, context (e.g. company/program, dates), short description.
- All entries loaded from `content.json`.

### 3.7 Achievements

- **List view** (no cards): single column, max-width container; items separated by bottom borders.
- Each: title, issuer/organization, date, optional short description.
- All entries loaded from `content.json`.

### 3.8 Events Attended

- Cards (e.g. 2-col grid on desktop).
- Each: type (Conference / Meetup / Workshop), title, date and location (or “Virtual”), short description.
- All entries loaded from `content.json`.

### 3.9 Projects

- Responsive card grid (e.g. 2–3 columns).
- Each card: thumbnail area (placeholder or image), title, description, tech tags, links (e.g. Live Demo, GitHub).
- Hover: clear, accessible hover states (e.g. subtle scale/outline/underline; no heavy glow).
- 4–6 projects loaded from `content.json`.

### 3.10 Contact

- “Let’s Work Together” (or similar) heading.
- Email link (mailto).
- **Contact form** (see Contact section component):
  - **Fields (all required unless otherwise specified):** Name, Email, Subject, Company, Project type (dropdown), Budget range, Timeline, Message.
  - On submit: opens default mail client via `mailto:` with prefilled subject and body; user must press Send manually. (Google Sheet integration via Apps Script is out of scope for initial static build.)
- Contact section and form implemented; form uses larger, readable text and padding.

### 3.11 Footer

- **Copyright line** (e.g. “© {year} {name}. All rights reserved.”).
- **Social links** repeated (LinkedIn, GitHub, etc.) with accessible labels.
- Full-width border-top; section padding and readable font size.

---

## 4. Technical Requirements

| Item               | Requirement                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Framework**      | Next.js (App Router), JavaScript                                                                                     |
| **Styling**        | Tailwind CSS; design tokens via CSS variables and Tailwind config                                                    |
| **UI components**  | shadcn/ui + Radix primitives for accessible, flat/minimal components (buttons, dialogs, etc.)                        |
| **Structure**      | Single-page layout (one main route) with anchored sections                                                           |
| **Content**        | All content from a single runtime-fetched `/content.json` file (in `public/`), including links and image paths       |
| **Images**         | Local images in the repo for profile photo, project thumbnails, and selected skill logos                             |
| **Theme**          | Light ↔ Dark toggle; initial theme follows system; subsequent choice stored in `localStorage`                        |
| **Behavior**       | **Smooth scroll** for in-page links (CSS `scroll-behavior: smooth`); **Intersection Observer** for scroll-triggered fade-in (translate/opacity only) on sections |
| **Responsiveness** | Mobile, tablet, desktop; nav collapses to menu on small screens                                                      |
| **Performance**    | Static assets only (hosted as static Next.js site); avoid animating blur; lightweight animations and effects         |
| **Accessibility**  | Semantic HTML; Radix-based components; aria-labels; focus states; sufficient color contrast (aim for WCAG AA)        |
| **SEO**            | Best practices + JSON-LD (Person/Portfolio), Open Graph & Twitter cards; canonical URLs for `https://vasharma05.com` |

---

## 5. Out of Scope (for initial version)

- Blog or multi-page case-study system (single page only for now).
- Authentication or admin dashboard.
- CMS integration (content is edited via `content.json` and redeploy).

---

## 6. Open Points / For Modification

- [ ] Exact copy and structure for each section (to be filled from your edits).
- [ ] Preferred typography (font families and weights).
- [ ] Whether to keep “Liquid glass” as-is, simplify, or remove.
- [ ] Final color tokens (hex/rgba) and contrast targets (e.g. WCAG AA).
- [ ] Number of placeholder items per section (e.g. 3 vs 5 achievements).
- [ ] Any new sections or removal of sections (e.g. Testimonials, Blog CTA).

---

## 7. Document History

| Version | Date     | Changes                                                                                           |
| ------- | -------- | ------------------------------------------------------------------------------------------------- |
| 1.0     | Feb 2025 | Initial PRD from conversation: full scope, liquid glass, contrast fixes, all sections.            |
| 1.1     | Feb 2025 | Switched to Next.js + Tailwind + shadcn/ui, flat minimal cards, JSON-based content, theming, SEO. |
| 1.2     | Feb 2025 | Implemented: typewriter (About), hero 90vh + scroll arrow, CTA resume/contact, smooth scroll nav, Skills (dividers, Font Awesome, center align, left-to-right flow, padding), Leadership/Achievements list view, Contact + Footer, section fade animations, site-wide and hero typography increases. |

---

## 8. Implemented Features (v1.2)

- **About:** Typewriter effect on first paragraph.
- **Hero:** Min 90vh height; large responsive headline/subtitle/CTA; scroll-down arrow to About.
- **CTA:** “Hire Me” downloads resume when `hero.primaryCta.resumeUrl` is set in `content.json`; otherwise scrolls to Contact.
- **Navigation:** Smooth scroll to section on nav link click.
- **Skills:** Two-column layout with dividers (no cards); subsections flow left-to-right; center-aligned titles and pills; Font Awesome icons; generous padding and spacing; larger subsection and pill typography.
- **Leadership & Achievements:** List view with bottom-border separators (no cards).
- **Contact:** Section and form present; mailto submit.
- **Footer:** Copyright and social links.
- **Animations:** Scroll-triggered fade-in (Intersection Observer) on sections.
- **Typography:** Increased font sizes site-wide and prominently in hero (nav, section titles, body, forms, footer).
