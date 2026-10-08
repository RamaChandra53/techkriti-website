# Redesign verification — 8 October 2026

Local production build, tested in installed Google Chrome. These are development-machine measurements, not a claim about production traffic or physical devices.

## Automated checks

- Content validation, lint (including tests), TypeScript, production build, and `git diff --check` pass.
- 16 Playwright tests pass: seven homepage widths (320, 375, 390, 430, 768, 1024, 1440px), visible first-screen event access, clipped-content checks, mobile navigation, shared query-route behavior, invalid slugs, all 19 archive images, combined filtering, reduced motion, keyboard focus, native touch swiping, carousel end-card/reset behavior, and conditional registration.
- Populated-state tests use synthetic data isolated under `tests/`; no invented event is included in `lib/content.ts` or any public route.
- Event essentials appear before the description in both the mobile layout and document reading order.
- Automated axe checks cover WCAG 2.0/2.1 A/AA on Home, Events, Gallery, and the populated carousel. The final pass includes visible-label/accessibility-name matching.
- Screenshots were visually reviewed at phone and desktop sizes. The 320px hero wrapping, revelation frame width, and header spacing were corrected during review.

## Lighthouse homepage results

| Local profile | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Mobile | 95 | 100 | 100 | 100 | 3.0 s | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |

Reports are in ignored local files `test-results/lighthouse-mobile.json` and `test-results/lighthouse-desktop.json`. Lighthouse also found a visible-label wording mismatch; the logo and event-detail link labels were corrected and added to the stricter axe regression coverage.

## Remaining review

- Physical iOS/Android use, real screen-reader review, and browser-toolbar/pinch zoom. The automated 200% CSS layout-scaling check is a smoke test, not a substitute for these.
- Real event/form destinations and organizer-approved event artwork after they are supplied.
- The supplied October video is integrated as a native controls-only player with metadata preload; physical mobile playback still needs organizer review.
- Organizer visual/content approval, photo permissions, and a Vercel preview before production.

No GitHub push or deployment was performed.
