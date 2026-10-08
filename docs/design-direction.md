# Techkriti design direction

This is the organizer's current visual and UX source of truth, based on the 40-part design brief supplied on 8 October 2026. The organizer later confirmed the official name is **Techkriti**, correcting the brief's “Techriti” spelling. Use this document with `docs/project-memory.md` for confirmed facts and content boundaries. If they conflict, do not invent facts; ask the organizer.

## Experience to create

Techkriti is a Halloween × technology student festival at MGIT on 16–17 October 2026. The site should feel like a premium technology event entering a Halloween world: cinematic, mysterious, energetic, and unmistakably student-made. It must not feel like a generic event template or a page decorated with unrelated pumpkins and bats.

The primary visitor journey is **arrive → understand the fest → discover technical or non-technical events → swipe or search → read details → open the event's official Google Form**. The homepage must expose the route into events in the first mobile screen. The secondary journey is reveal, story, and correctly labeled previous-edition photography. About 90–95% mobile usage is the organizer's planning assumption, not a measured analytics figure.

## Decision order

1. Usability and truthful information.
2. Event discovery and direct registration.
3. Intentional mobile behavior and accessibility.
4. Performance on ordinary mobile networks.
5. Memorable brand identity and visual atmosphere.
6. Decorative effects only when they help the preceding goals.

## Visual system

- Base: near-black `#0d0a12`; raised surfaces `#17121d` and `#211827`; dividers `#453444`.
- Primary accent: ember `#ff7938`; secondary accent: restrained plum `#a889c6`; primary text `#fff4e9` and muted text `#cbbac7`.
- Geist is used as a readable, highly weighted display and UI family; italic serif appears only as a rare accent. Avoid decorative body copy.
- The existing optimized Halloween artwork is thematic hero art, not a picture of MGIT. Real photos must be labeled as February 2026 archive material.
- Prefer dramatic typographic hierarchy, varied editorial composition, clear actions, and purposeful space. Avoid fake statistics, fabricated event posters, many competing colors, perpetual motion, and scroll pinning.

## Components and behavior

- The hero gives the name, dates, MGIT, two tracks, and an immediate Explore events action.
- Confirmed events appear in a native horizontal swipe carousel with technical/non-technical selection, an event counter, and keyboard/arrow controls. The dedicated Events page keeps search and shareable track/category/day filters.
- When no event has been confirmed, show two track routes and a plainly labeled pending-lineup state; never simulate event cards or active registration buttons.
- Event detail pages show eligibility, time, venue, team size, rules/prizes only when supplied. A Google Form CTA is visible only with a real URL and remains accessible at the bottom of a phone screen.
- The banner revelation is prominent, but absent video remains an honest state. A previous-edition film can be shown only as explicitly labeled archive media.
- Use optimized images, reserved image dimensions, restrained native motion, visible focus, 44px-or-larger controls, reduced-motion support, and strong contrast. Do not make hover the only path to information.

## Launch boundary

The design can be reviewed locally before event names, forms, rooms, and video exist. Public production launch still requires confirmed content, photo permissions, final mark approval, and Vercel preview review. The selected archive photos are not automatic permission to publish them.
