# CLAUDE.md — zinu.kim (personal site)

## Project
Personal site for a SKKU Intelligent Software undergrad who does **both
research and engineering**. Primary readers: (a) faculty / lab contacts
scanning for publications, (b) recruiters / hackathon peers scanning for
projects. The site must serve both in one page without diluting either.

- Domain: `zinu.kim` (Cloudflare Registrar, DNS on Cloudflare)
- Contact: `me@zinu.kim` (Cloudflare Email Routing, receive-only)
- Stack: **Astro** (static) + **Cloudflare Pages** (GitHub auto-deploy)
- No backend, no CMS, no database.

## Information architecture
Home is a summary; depth lives in sub-pages.

```
/                 Hero → News → Publications(3) → Projects(4) → Contact
/publications     full list, reverse chronological
/projects         active / shipped / archived
```

Do NOT add: Teaching, Academic Services, Skills bar, testimonials.
Empty or padded sections are worse than missing ones.

## Content model (Astro Content Collections)
```
src/content/
├── news/          one .md per item  { date, title, body }
├── publications/  one .md per paper { title, venue, authors,
│                    date, type, links{paper,code,demo}, thumb?,
│                    contribution? }
└── projects/      one .md per proj  { title, blurb, status,
                     tags[], links{repo,demo,paper?}, date }
```

Rules:
- `authors` is a plain string; the site bolds the site owner's name.
  Author order is never hidden or reordered.
- `type`: `conference | workshop | preprint | poster`. Render as a small
  label next to the venue.
- `contribution`: one short line on what the owner actually did. Show it
  for non-first-author entries.
- `status`: `active | shipped | archived`. Archived items still render,
  greyed, with an honest note — do not delete history.
- `tags`: e.g. `Research`, `ML`, `Systems`, `Tooling`. A project with both
  a paper and a repo gets both links on the same card. Do not split
  research and engineering into separate silos.

## Design direction
Reference points, in priority order:
1. **Structure** — academic homepages: News feed + Publications + Projects.
2. **Texture** — Korean fintech product sites: generous whitespace, large
   type, soft cards, one accent colour only.
3. **Detail** — craft-focused personal sites: precise hover/focus states,
   one considered motion moment.

Constraints:
- Type: Pretendard for Korean/Latin body. Pick a distinct display face
  for the name only, or set the same family at a much larger optical size.
  Line length under 80ch.
- Colour: 4–6 named tokens in `src/styles/tokens.css`. Exactly one accent.
  Light + dark mode.
- Layout: single column, fixed card width, stacked vertically. No masonry,
  no grid galleries, no horizontal scroll.
- Motion: at most one orchestrated moment. No per-section fade-and-slide-up
  on scroll, no hover transition on every card.
- Avoid: ALL-CAPS eyebrow labels, `01 / 02 / 03` markers on non-sequences,
  `→` appended to link text, meta strings joined with `·`, gradient washes.

## Non-negotiables
- Static output only. No server, no runtime API calls at request time.
- No `localStorage`/`sessionStorage` for content state.
- Relative paths for internal links; absolute `https://` for external.
- Every external link: `rel="noopener noreferrer"`.
- Ship the quality floor silently: responsive to 360px, visible keyboard
  focus, `prefers-reduced-motion` respected, semantic headings, alt text.
- Never invent publication, venue, date, or award data. If a field is
  unknown, leave it out and ask.

## Git
- Create a new branch per task. Commit only on that branch.
- No merge, no PR, no push to `main` unless explicitly told.
- Never commit secrets, API tokens, or the Cloudflare account ID.

## Token discipline (high priority)
- Never read a file whole — grep/glob to the needed range.
- Skip `node_modules`, lockfiles, `dist/`, `.astro/`.
- Output diffs and a one-line summary. Do not re-print file contents.
- Plan in ≤3 lines. Report completion in 1–2 lines.
- No full-repo exploration; open the target file directly.

## Language
- This file, code, comments, commit messages, filenames: **English**.
- Site UI copy and all conversation with the owner: **Korean**.
- `SPEC.md` / `README.md`, if created: **Korean**.

## Open decisions — ask before assuming
- Publication list: which entries are accepted vs. under review vs.
  preprint. Do not render a status that has not been confirmed.
- Whether a CV PDF is linked from the hero.
- Whether `/blog` is in scope. Default: out of scope for v1.
- Thumbnail images for publications: available or not.

## Workflow
Documentation first. Before writing implementation code for a new section,
write or update the relevant spec entry, confirm it, then build.
