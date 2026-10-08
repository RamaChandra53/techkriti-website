<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Techriti project guidance

- Work in this existing Next.js repository. Vercel is the intended deployment target.
- Do not use the Sites skills or move this website to Sites hosting.
- For frontend design and redesign work, read and use the installed `gpt-taste` skill. Apply its layout, typography, hierarchy, and anti-generic design guidance in the context of this festival, not as a reason to add unnecessary effects.
- Prioritize fast, accessible event discovery over animation. Keep motion restrained and respect reduced-motion preferences; explicit user requirements take precedence over any skill preference for GSAP or scroll effects.
- Keep the February 2026 photo archive clearly separate from the upcoming 16–17 October 2026 Halloween edition. Do not invent event names, rooms, times, sponsors, or registration URLs.
- The current architecture and visitor flows are documented in `docs/architecture.md`.
- Read `docs/project-memory.md` before changing content, page structure, or visual design; it records the organizer's goals, confirmed facts, unknowns, and launch priorities.
- Treat `docs/design-direction.md` as the current UX and visual source of truth and `docs/redesign-phases.md` as the phased implementation record. The public name in the latest organizer design brief is Techriti; older assets and photos may still show Techkriti and must not be silently altered.
