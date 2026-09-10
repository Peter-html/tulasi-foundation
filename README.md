# Tulasi Foundation — Advanced Frontend Redesign

A React + Vite + Tailwind redesign of the Tulasi Foundation website with a more editorial, architecture-led experience.

## What changed

- Cinematic full-screen project hero using real Limelight drone photography
- Floating glass navigation that changes on scroll
- Large architectural typography and asymmetric editorial spacing
- Scroll/parallax motion using Framer Motion
- Full-width project storytelling instead of small generic cards
- Redesigned Projects listing page
- Redesigned Project detail page with cinematic hero, project facts and masonry gallery
- Strong site-visit / enquiry CTA
- Responsive mobile navigation
- Stable project IDs instead of Faker-generated UUIDs
- Real Limelight images optimized to WebP for web delivery
- Entrance animation kept as a separate Preloader component

## Current project media

`Limelight` uses the real drone images provided in the conversation.

`Project 02`, `Project 03` and `Project 04` are presentation placeholders. Replace their names, content and images in:

`src/data/mockProjects.js`

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Main files

- `src/components/Hero.jsx`
- `src/components/Header.jsx`
- `src/components/AboutUsSection.jsx`
- `src/components/ServicesSection.jsx`
- `src/components/ProjectsSection.jsx`
- `src/components/ContactSection.jsx`
- `src/pages/ProjectsListPage.jsx`
- `src/pages/ProjectDetailPage.jsx`
- `src/data/mockProjects.js`

## Design direction

The redesign takes high-level inspiration from premium architecture and real-estate experiences: immersive imagery, restrained navigation, large editorial type, project-led storytelling, environmental context and strong enquiry actions. It is an original implementation rather than a copy of any reference website.
