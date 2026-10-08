# Techkriti 2026 · MGIT

A Halloween-themed, two-day festival site for Mahatma Gandhi Institute of Technology, Hyderabad. Built with Next.js 16, TypeScript and Tailwind CSS.

See [the architecture and visitor-flow diagrams](docs/architecture.md) for the current routes, content pipeline, registration handoff, and deployment flow.

Read [the project memory](docs/project-memory.md) for the organizer's product goals, visual direction, confirmed facts, open decisions, and launch priorities.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

Edit `lib/content.ts` to update the festival identity, event list, schedule, sponsors, FAQs, Instagram URL and reveal video. The event array starts empty so unconfirmed titles, venues, times and registration links are not shown as facts.

Add a confirmed event to `events` with its stable slug, division (`Technical` or `Non-Technical`), category, day (1 = 16 October, 2 = 17 October), time, room, description, eligibility and team size. Set `registrationUrl` to that event’s Google Form URL (`forms.gle` or `docs.google.com/forms`). Its detail page will show a `Register Now` link that opens the form in a new tab. Set `rulesUrl` if a rules document is ready.

Add matching sessions to `schedule` when their times and rooms are confirmed. Sponsor entries are also intentionally empty until partner names and tiers are approved.

Put the reveal video in `public` (MP4 or WebM) and set `bannerVideoUrl` to its local path, such as `/banner-reveal.mp4`. The reveal panel uses native controls and a poster image. Add the actual Instagram profile URL to `siteConfig.social.instagram`; the Instagram links appear automatically in the header, footer and contact page.

The production content check rejects stale placeholders and any event registration URL that is not a direct Google Forms URL. Test the guard locally with:

```bash
$env:CONTENT_STRICT="true"; npm run validate:content
```

## Vercel deployment

1. Import this repository in Vercel.
2. Keep the detected Next.js settings and `npm run validate:content && npm run build` build command.
3. Use preview deployments for review.
4. Set `NEXT_PUBLIC_SITE_URL` to the final public URL if you add a custom domain. Vercel deployment URLs are used automatically when that variable is absent.
5. Add the custom domain in Vercel and configure the DNS records shown there. HTTPS is provisioned automatically after DNS validation.

No secret environment variables are required for this static release.
