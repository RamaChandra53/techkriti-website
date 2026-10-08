# Techkriti website: product and design memory

Last updated: 8 October 2026. This is a living brief assembled from the organizer's requests in this conversation and checked against the current repository. It records both intended behavior and what is currently implemented. Update it when the organizers make a new decision; do not silently turn an assumption into a fact.

## The north star

Techkriti should feel like **MGIT students' own festival**: a place to discover something worth joining, contribute to it, and feel proud that it happens on their campus. The website exists to answer practical questions quickly and tell the story of why this edition matters. It is an information and discovery hub, not the registration system. The organizer's newer 40-part UX direction is distilled in `docs/design-direction.md` and takes precedence for visual decisions.

A first-time visitor should be able to answer these questions without hunting:

1. What is Techkriti, and what is different about the October 2026 edition?
2. When and where is it?
3. What technical and non-technical events can I join?
4. When and where does my chosen event happen, who can enter, and what are its rules?
5. How do I register, and where will official updates appear?

If confirmed event data is not available yet, state that plainly. An honest empty state is better than invented event cards or a prominent button that goes nowhere.

## People we are building for

- **Primary:** students and prospective participants browsing on phones, often arriving from a shared link or Instagram. They need quick answers, readable details, and a direct path to the right event.
- **Also:** friends deciding what to attend together; visitors planning two days on campus; organizers sharing event URLs and keeping details accurate; potential supporters looking for legitimate festival context.
- Do not assume every event is open to every visitor. Eligibility and team-size rules belong on each confirmed event page.
- Public availability means the site must work for everyone who needs information, including keyboard, screen-reader, low-bandwidth, and zoom users. It does not imply unrestricted event eligibility.

## Festival facts and boundaries

| Item | Current decision or status |
| --- | --- |
| Name | **Techkriti**, explicitly confirmed by the organizer after the pasted briefs used “Techriti.” Use Techkriti for all current public text and metadata. The existing symbolic mark may still need final visual approval. |
| Organizer/location | Mahatma Gandhi Institute of Technology (MGIT), Hyderabad; Department of IT and CSBS context |
| Upcoming edition | 16–17 October 2026, on the MGIT campus |
| Creative theme | Halloween, across the whole upcoming edition |
| Event tracks | Technical and non-technical |
| Registration | Each confirmed event will link directly to its official Google Form; the site will not store registrations |
| Previous edition | February 2026, with a Telugu-movie-themed identity; its photos and past event references are archive material only |
| Current content status | October event names, exact timings, MGIT rooms, rules, forms, sponsors, contact details, Instagram URL, and banner reveal video are not yet confirmed in `lib/content.ts` |

The previous posters and screenshots were supplied to explain the earlier festival, not to authorize reusing their event lists or movie theme for October. On 8 October, the organizer selected 19 photos in `D:\Techkriti\photos feb 2026\New folder`. Optimized copies are in `public/archive/selected/`, and `lib/archive.ts` now uses that selection for the archive grid and homepage preview. The original files remain untouched. Confirm permission to publish identifiable people before production. Always caption or label these as previous-edition material; never present them as scenes from the upcoming Halloween edition.

## The story the site should tell

The story is not “a haunted template with event cards.” It is: **a campus community built the festival before; this October Techkriti returns with a Halloween identity; there are different ways to take part; your participation shapes what the next edition becomes.**

The story should be concise and useful. Lead with identity, dates, MGIT, and the route into events. Use the February archive as proof of real people and energy, then make a clear transition to the new October edition. Show confirmed details as they arrive, not vague hype in place of facts. The desired feeling is curiosity, belonging, anticipation, and campus pride, without exaggerated claims or fabricated testimonials.

## Visual and interaction direction

- The Halloween identity must be unmistakable, but mature and specific to Techkriti. The current local redesign uses a near-black, ember-orange, and restrained plum system with readable cream text. Verify contrast in the actual UI.
- Favor an editorial composition with confident type, varied but disciplined layouts, real festival photography, generous spacing, and clear calls to action. A student should recognize a festival made by people at MGIT, not an anonymous AI-generated Halloween landing page.
- Avoid generic haunted-house art, random bats/spiders, ornamental sparkles, fake statistics, repetitive gradients, overused gothic fonts, stock imagery presented as campus life, and empty motivational copy. Do not fill missing content with invented event names or rooms.
- Keep the logo's full mark visible with a transparent background. The header logo and browser-tab icon should never show a white square. Use the existing transparent asset unless an approved, better official source is supplied.
- Motion is subordinate to finding information. Small purposeful hover/focus feedback is enough; no heavy page transitions, pinned scroll scenes, delayed content, or animation that makes navigation harder. Respect `prefers-reduced-motion`.
- Mobile is the primary design case. Navigation, search/filter controls, schedule, event details, and registration must remain clear on a small phone and at 200% zoom.
- Use the installed `gpt-taste` skill for anti-generic layout, typography, and hierarchy during redesign work, but the organizer's accessibility, speed, authenticity, and restrained-motion requirements override that skill's motion-heavy defaults. Do not use the Sites skill or move this repository away from Next.js/Vercel.

The restarted 8 October redesign implements the dark/ember/plum system across the live routes, with Geist typography and the previously approved Halloween illustration as the **homepage hero background**. Its optimized WebP copy is thematic artwork, not a depiction of MGIT. The mobile-first hero leads directly into discovery. While the lineup is empty, two track routes and a clear pending message appear; confirmed events activate a swipeable, keyboard-operable carousel and homepage search. The dedicated Events page retains full URL-synced filters. The homepage then gives a concise festival explanation, reveal, confirmed two-day facts, labeled February archive, FAQs, and a final event route. The 2026 banner film remains an honest unreleased state until supplied; an approved February film can only be shown as labeled archive media. Motion is deliberately restrained. This is implemented locally and has passed content validation, lint, type checking, and production build, but it is not visually signed off or deployed.

## Information architecture and expected journey

The top-level experience should make **Events** and **Schedule** easy to find. The site currently has Home, Events, event detail, Schedule, Gallery, About, Sponsors, FAQs, and Contact routes. The mobile-first homepage should show the route into events in the first phone screen and place the compact event preview within one short swipe; the dedicated Events page does the detailed search and filtering work.

The central path is:

```text
Arrival (often mobile/social link)
  -> understand Techkriti + 16–17 October + MGIT
  -> open Events or a technical/non-technical track
  -> search/filter by keyword, track, category, and day
  -> read one event's rules, eligibility, team size, time, and room
  -> open that event's official Google Form in a new tab
```

Search/filter state should live in shareable URL parameters so an organizer or friend can send a filtered view. Combined filters, empty results, and reset must make sense. The schedule should be day-based and link confirmed entries to their event details. With an unconfirmed lineup, explain what is pending and give visitors a clear place to check later, rather than pretending the search has results.

The banner reveal deserves a distinct place in the story. The organizer has a previous reveal video and expects a new banner reveal/revolution moment; confirm which video is approved for this edition and the exact public wording. Until a 2026 video is supplied, do not show a fake playable video or imply the prior reveal is new. When supplied, use a lightweight native player with controls, captions/transcript if speech matters, and a meaningful poster.

The Instagram page should be linked once its official URL is supplied. Do not guess the handle. The public site can share announcements, but authoritative registration remains in the event's Google Form.

## Content model and maintenance

Developers maintain structured, typed content in the repository, principally `lib/content.ts` and `lib/types.ts`; the previous-edition photo captions live in `lib/archive.ts`. There is no CMS or admin dashboard in the first release.

Each event needs a stable slug, title, summary, description, technical/non-technical division, category, day, time, MGIT venue or room, eligibility, team size, rules link when available, and optional external registration URL. Optional inline rules and prize details are supported; leave them absent until confirmed. A registration button must appear only when that event's real Google Form URL is present; open it safely in a new tab and label that behavior accessibly. On phones, an available form CTA remains visible at the bottom of the detail page. Do not create an internal registration database, accounts, payments, or form collection.

The schedule, FAQs, sponsors, announcements, navigation, and site identity should remain easy to update without rewriting page layouts. Each update should be checked against organizer-approved facts, spelling, dates, working links, and the separation of archive and upcoming-edition content.

## Priorities, in order

1. **Truth and trust:** accurate dates, location, eligibility, rooms, links, and clear “not yet announced” states. No fabricated content.
2. **Event discovery:** visitors can find a relevant event quickly through clear navigation, search, filters, schedule, and shareable links.
3. **Direct registration:** every live registration CTA goes to the correct event's official Google Form; absent forms do not produce dead buttons.
4. **Accessible, fast mobile UX:** readable contrast and type, keyboard/focus support, screen-reader labels, reduced motion, optimized assets, and low-bandwidth performance.
5. **Distinct Techkriti identity and story:** a memorable Halloween atmosphere anchored in the existing symbolic mark, MGIT community, and correctly labeled archive.
6. **Maintainability and discoverability:** typed content, metadata, canonical URLs, Open Graph, sitemap, robots, and a safe Vercel preview-to-production workflow.

Visual novelty is not a reason to move a practical task lower in that order.

## Build and launch constraints

- Preserve the existing compatible Next.js, TypeScript, and Tailwind repository. Read this installed Next.js version's bundled docs before changing Next APIs. Vercel is the chosen host; do not use Sites hosting.
- Use Vercel branch previews for review, then promote from the primary branch only after content and UI review. Configure the custom domain and HTTPS when the real domain is supplied.
- Do not publish literal placeholders as festival facts. The current `scripts/validate-content.mjs` only catches a limited set of placeholder tokens and invalid Google Form hosts; it does **not** prove the lineup, contact details, schedule, imagery, or launch copy are complete. A human launch review is still required, and the validator should be strengthened before a public launch if the brief requires stricter gating.
- Verify phone, tablet, laptop, and wide desktop layouts; 200% zoom; keyboard and screen-reader flows; reduced motion; combined filters and URL persistence; invalid slugs; missing registration links; internal/external destinations; social metadata; production build; and accessibility/performance checks. Aim for at least 90 in Lighthouse accessibility, SEO, and best practices on representative pages, with no major layout shift.
- Use real photos responsibly. Confirm permission to publish identifiable student images and the correct credits or captions before production.

## Known open decisions to request from organizers

- Confirmed October 2026 event names and which track/category/day each belongs to.
- Per-event descriptions, rules, eligibility, team sizes, exact times and MGIT room numbers.
- One official Google Form URL per event, and when each registration opens/closes.
- Official banner reveal video for this edition, exact name of the reveal, poster, and any transcript/captions.
- Whether the earlier February reveal film may be published as clearly labeled archive material.
- Official Instagram and other social URLs, contact email/phone, approved sponsors and brand assets.
- Final domain, production approval, photo permissions, and whether any event has limited eligibility or capacity.

Until these are answered, build the structure and honest states. Do not borrow specifics from February 2026 to fill October 2026 gaps.

## Maintenance rule for this memory

When a new organizer message changes the brief, update the relevant section, mark the new fact as confirmed or pending, and align `lib/content.ts`, route copy, and `docs/architecture.md` when necessary. When a design choice is implemented, distinguish the locally built behavior from an approved or publicly shipped result. The current redesign is implemented locally but still needs organizer review, responsive/accessibility QA, real event content, final mark approval, photo permissions, and Vercel preview review before public launch.
