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

## 9 October 2026 revision

The hero fills the first mobile viewport below the header so the revelation begins below the fold. Remove both hero buttons and the mobile menu. The header has one Register jump; desktop section links point into the same page. The homepage contains the full labeled February archive without a More memories link. Event discovery uses the supplied rotating fan arrangement with pumpkin-face previous/next controls. The bat entrance plays once from the lower hero corners and honors reduced motion. These choices replace the conflicting earlier homepage, photo-preview, and carousel details in this document.

## 9 October 2026 poster fan refinement

The event section now uses one centered square poster with smaller angled posters on both sides, without the large details card or track tabs. A small track label accompanies each event. Poster clicks open a compact dialog; uploaded official poster images can replace the title placeholders through structured event data. The direct event page returns to the homepage event section.

## 9 October 2026 stacked gallery and page background

The moonlit `hero-halloween.webp` artwork now sits behind the site at phone and laptop sizes, with a dark readability veil. The hero still uses its own prominent artwork. All 19 February archive images form a CSS sticky stack on larger screens and a readable single-column sequence on phones. A copper edge, fine inner line, and shadow frame the photos without filtering them. The header shows the logo and Register action only. Poster cards have a small open-details arrow, and the pumpkin controls contain explicit cream directional arrows.

## 10 October 2026 mobile stack

The CSS sticky gallery stack now applies on phones as well as larger screens. The photos retain their Halloween frames, captions, and accessible links; the arrow overlays on photos are removed.

## 10 October 2026 image-stack carousel

The latest supplied reference replaces the sticky stack on both viewport sizes with a draggable pile. Visitors can drag, swipe, or tap the front image to reveal the next of 19 real February photos. A visible counter, caption, separate full-photo link, and external Next photo button support navigation without placing arrows over the image. Respect reduced-motion preferences.

## 10 October 2026 image sizing and controls

The pile follows the current photograph's landscape or portrait ratio, and images fit fully inside their frames. Remove the separate full-photo link and Next photo button. Keep the count and caption, and place a short swipe/drag/tap instruction immediately below the images.

## 10 October 2026 background, fan, and density refinement

The Halloween artwork is one fixed page wallpaper, including behind the hero; do not layer a separate duplicate hero copy over it. Tighten section padding and vertical gaps without removing or rewriting internal content. Bring the event fan cards closer together, strengthen their Halloween gradient with ember orange, dark red, plum, and near-black, label the small corner action as Details, and use clean directional arrows inside the pumpkin controls.

## 10 October 2026 temporary ending state

The orange final CTA and global footer are removed pending a replacement direction from the organizer. Do not reintroduce or redesign either block without that direction.

## 10 October 2026 FAQ placement

Place the complete FAQ and its contact guidance at the end of the homepage, after the February archive. The header FAQ link scrolls to this section. Do not maintain a separate `/faq` page.
