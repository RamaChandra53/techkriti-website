# Techkriti design direction

Updated 8 October 2026 from the organizer's latest 49-part repository brief. This supersedes the earlier 40-part brief wherever the homepage structure differs. Use **Techkriti**, the organizer-confirmed spelling, and read `docs/project-memory.md` for facts and unknowns.

## Experience

A cinematic Halloween × technology student festival at MGIT, 16–17 October 2026. Minimal text, strong identity, effortless event discovery, and real student memories. Most visitors are expected to use phones; that is a planning assumption, not measured analytics.

## Homepage order

1. **Hero:** Techkriti. After dark. Dates, MGIT, and both tracks, with direct Explore events and The revelation links.
2. **Revelation:** the supplied October 2026 banner film, presented in a prominent native player with controls.
3. **Event discovery:** a short heading, clear Technical / Non-technical selectors, then confirmed-event posters or an honest pending state.
4. **Last time at Techkriti:** bright February 2026 photography in a large–small–large editorial sequence.
5. **Final CTA:** a short invitation and Explore Events / Register jump, followed by a compact footer.

The sticky header and hero expose an Explore Events / Register jump to the on-page carousel. The hero's secondary Revelation link jumps to the video section. The revelation's narrative placement must not become a barrier. Remove homepage About, expectation cards, FAQ blocks, and explanatory paragraphs. Supporting routes remain available.

## Priority

Truthful content is a constant requirement. For design tradeoffs, follow the latest brief: mobile UX → event discovery → visual identity → performance → registration clarity → photography/storytelling → animation → decoration. Never sacrifice access or speed for effects.

## Visual system

- Near-black `#0d0a12`, raised surfaces `#17121d` / `#211827`, dividers `#453444` / `#63485d`.
- Ember `#ff7938`, hover ember `#ffa16a`, one restrained plum accent `#a889c6`, cream `#fff4e9`, muted text `#cbbac7`.
- Retain Geist: expressive display weight, readable UI/body text. Broad, short headings; minimal supporting copy.
- Use compact `2px` control corners and `4px` card corners; avoid pill-shaped controls.
- Share a warm visible focus ring (`#ffc08d`), a restrained card shadow, and a faint ember glow only on hovered primary actions.
- Space main sections at `56px` on phones, `96px` from `640px`, and `112px` from `1024px`. Compact closing sections use `56px` and `80px`.
- Keep interaction transitions near `160–220ms`, use `prefers-reduced-motion`, and do not add continuous or scroll-pinned animation.
- Responsive composition is mobile-first; use the existing Tailwind breakpoints at `640px`, `768px`, `1024px`, and `1280px`.
- The approved Halloween WebP remains the homepage hero artwork, not a depiction of MGIT.
- Preserve real photos without dark Halloween filters. Their brightness contrasts with the surrounding interface.
- Use a small, consistent radius, purposeful borders, restrained lighting, and generous spacing. Avoid repetitive card grids, badges, decorative clutter, fake statistics, and fabricated posters.
- Apply `gpt-taste` for composition and hierarchy. User requirements override its GSAP, pinned-scroll, and constant-motion defaults. No added animation library.

## Event experience

- Native scroll-snap, a dominant current card with part of the next visible, a counter, previous/next buttons, keyboard arrows/Home/End, reduced-motion support.
- Switching track resets to its first card. A trailing spacer lets the final card align correctly at every viewport width.
- Selectors remain interactive when no events are confirmed; show a track-specific pending state with a route into Events. Do not show a fake counter or inactive registration.
- The homepage opens directly into the technical/non-technical swipe carousel. Keep the `/events` route list-first; query, track, category, and day parameters remain supported for shareable direct URLs without exposing a bulky control panel.
- Shared poster cards display only name, track/category, short summary, date/time, room, team size, and details. Optional organizer artwork lives in structured event data.
- Details put essentials first on phones, then description, rules, and supplied prizes. Long rules use a native disclosure.
- A real per-event Google Form enables the registration button. The mobile action is fixed with safe-area spacing and footer clearance; absent forms display a short status.

## Photography and revelation

`components/archive-story.tsx` supplies reusable photo figures. The homepage uses four selected photos; the archive groups all 19 into people, campus, and handmade details. Every archive experience is labeled February 2026. Large photo links open in a new tab with an accessible label.

The supplied October 2026 film is stored at `public/branding/revelation.mp4` and rendered with native controls, inline mobile playback, and `preload="metadata"`. Do not autoplay or add a previous-edition fallback.

## Verification and launch

Check 320, 375, 390, 430, 768, 1024, and 1440px; event access above the fold; no overflow; keyboard and swipe; category resets; absent and supplied forms; readable contrast; reduced motion; zoom; and optimized images. Isolated synthetic browser-test fixtures must never enter public content.

Local design completion is separate from organizer approval and Vercel deployment. Real event details, forms, video, social/contact details, and photo permissions remain organizer inputs. No deployment is part of this pass.
