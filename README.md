# Mithul Koshy · Portfolio

Personal portfolio of Mithul Koshy, Software Engineer in Test (SDET), focused on Playwright & TypeScript automation and agentic AI workflows for QA.

**Live site:** https://MithulPy.github.io/mithulkoshy-portfolio

## Highlights

- Single-page React site with a red / black / white theme and a light/dark toggle
- **Probe**, an animated QA-agent mascot that walks between sections, reacts to what you're reading and shares QA / AI-agent facts
- Skill tiles with brand logos, a tool marquee and animated pipeline previews for projects
- Respects `prefers-reduced-motion`; works on mobile

## Tech

React 18 · styled-components · Framer Motion · react-icons · GitHub Pages

## Develop

```bash
npm install
npm start          # dev server at http://localhost:3000
npm test           # run tests
npm run deploy     # build and publish to the gh-pages branch
```

All portfolio content (experience, skills, projects, Probe's lines) lives in [`src/data/profile.js`](src/data/profile.js).
