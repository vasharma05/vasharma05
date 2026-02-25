# Product Requirements Document: Frontend Developer Portfolio Website

**Version:** 1.1  
**Status:** Ready for implementation  
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
  - Cards for Experience, Skills, Projects, Leadership, etc.
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
- **Left:** Name or logo (links to hero/top).
- **Center/Right:** Navigation links: About, Experience, Skills, Leadership, Achievements, Events, Projects, Contact.
- **CTA:** “Hire Me” button (gradient accent; links to Contact/email).
- **Social:** LinkedIn, GitHub, Twitter/X as icons (with accessible labels).
- **Mobile:** Hamburger menu for nav and social.

### 3.2 Hero Section

- Large greeting headline with animated gradient text: e.g. “Hi, I’m <name>”.
- Short tagline (e.g. Frontend Developer focus from JSON file).
- Background: Subtle animated gradient orbs or mesh (CSS-only; no blur animation for performance).

### 3.3 About Me

- Brief bio paragraph.
- Profile photo/avatar (placeholder or image).
- Tech stack as “glowing” pills/badges with specific logo (e.g. React, TypeScript, Tailwind, etc.).
- Layout: responsive (e.g. stacked on mobile, side-by-side on desktop).

### 3.4 Skills

- Subdivided by **domains** (e.g. Frontend, Backend & Data, Tools & Workflow, Testing & Quality).
- Each domain: title + list of skills as pills/badges (with optional logos/icons).
- Responsive grid (e.g. 1 col mobile, 2 cols desktop).
- All content loaded from `content.json`.

### 3.5 Experience (Timeline)

- Vertical timeline with alternating left/right cards (or stacked on mobile).
- Each entry: company name, role, date range, short description.
- Connecting line with accent; dots at each step.
- All entries loaded from `content.json`.

### 3.6 Leadership

- Cards (e.g. 3-col grid on desktop, 1 col on mobile).
- Each: role title, context (e.g. company/program, dates), short description.
- All entries loaded from `content.json`.

### 3.7 Achievements

- List or grid of items.
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

### 3.10 Footer / Contact

- “Let’s Work Together” (or similar) heading.
- Email link (mailto).
- **Contact form**:
  - **Fields (all required unless otherwise specified):**
    - Name
    - Email
    - Subject
    - Company
    - Project type (dropdown: Portfolio, SaaS, Marketing site, Other)
    - Budget range
    - Timeline
    - Message
  - On submit:
    - Opens the user’s default mail client via `mailto:` with **prefilled subject and body**. User must press **Send** manually.
    - Sends data to a **Google Sheet** via a Google Apps Script HTTP endpoint (implementation in a small backend/script; not part of the initial static-only constraints).
- Social links repeated (LinkedIn, GitHub, Twitter/X).
- Copyright line.

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
| **Behavior**       | Smooth scroll for in-page links; Intersection Observer for scroll-triggered fade-in (translate/opacity only)         |
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

---

Next steps:

- A typewrite effect for about me section
- Clicking on the CTA button should scroll download the resume
- Clicking on the button in navigation bar should scroll smoothly to the corresponding section
- The Hero section should take the 90% of the screen height and then there should be a vertical arrow pointing down to the About section
- The Skills domains should be one below another in a grid of 2 columns, with the skill items in a row below the domain name, all of that in center align
- Can we use Font Awesome for the icons in the Skills section?
- Missing contact and footer section
- Animations
