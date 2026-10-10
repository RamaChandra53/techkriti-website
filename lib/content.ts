import type { Announcement, Event, FAQ, ScheduleItem, SiteConfig, Sponsor } from "./types";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const siteConfig: SiteConfig = {
  name: "Techkriti",
  shortName: "TECHKRITI",
  institution: "Mahatma Gandhi Institute of Technology · Department of IT / CSBS",
  city: "Hyderabad",
  dates: "16–17 October 2026",
  year: "2026",
  tagline: "A Halloween-themed festival at MGIT.",
  description: "Techkriti brings poster-confirmed technical and non-technical events together at MGIT on 16–17 October 2026. Individual schedules and registration links will be added as they are released.",
  email: "",
  phone: "",
  url: publicSiteUrl,
  bannerVideoUrl: "/branding/revelation.mp4",
  previousBannerVideoUrl: "",
  previousBannerPosterUrl: "",
  social: { instagram: "" }
};

// Names, tracks, dates and D-Block are confirmed by the organizer's October 2026 poster.
// Times, room numbers, rules, eligibility, team sizes and forms remain intentionally pending.
const pendingEventDetails = {
  day: undefined,
  time: undefined,
  venue: "D-Block, MGIT",
  eligibility: "To be announced",
  teamSize: "To be announced",
  description: "Official rules, room assignment, eligibility and registration details will be published when confirmed.",
} satisfies Partial<Event>;

export const events: Event[] = [
  { ...pendingEventDetails, slug: "poster-presentation", title: "Poster Presentation", eyebrow: "Technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Technical", category: "Event", accent: "electric" },
  { ...pendingEventDetails, slug: "tech-treasure-hunt", title: "Tech Treasure Hunt", eyebrow: "Technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Technical", category: "Event", accent: "coral" },
  { ...pendingEventDetails, slug: "image-prompting", title: "Image Prompting", eyebrow: "Technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Technical", category: "Event", accent: "sky" },
  { ...pendingEventDetails, slug: "code-debug", title: "Code Debug", eyebrow: "Technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Technical", category: "Event", accent: "acid" },
  { ...pendingEventDetails, slug: "risk-poly", title: "Risk Poly", eyebrow: "Technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Technical", category: "Event", accent: "electric" },
  { ...pendingEventDetails, slug: "mummy-wrap", title: "Mummy Wrap", eyebrow: "Non-technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Non-Technical", category: "Event", accent: "coral" },
  { ...pendingEventDetails, slug: "ipl-auction", title: "IPL Auction", eyebrow: "Non-technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Non-Technical", category: "Event", accent: "sky" },
  { ...pendingEventDetails, slug: "period-cramps-simulator", title: "Period Cramps Simulator", eyebrow: "Non-technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Non-Technical", category: "Event", accent: "acid" },
  { ...pendingEventDetails, slug: "valo-and-codm", title: "VALO and CODM", eyebrow: "Non-technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Non-Technical", category: "Event", accent: "electric" },
  { ...pendingEventDetails, slug: "vr-gaming", title: "VR Gaming", eyebrow: "Non-technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Non-Technical", category: "Event", accent: "coral" },
  { ...pendingEventDetails, slug: "deadlift", title: "Deadlift", eyebrow: "Non-technical event", summary: "Poster-confirmed event from the October 2026 lineup. Details coming soon.", division: "Non-Technical", category: "Event", accent: "sky" },
];

export const schedule: ScheduleItem[] = [];

export const sponsors: Sponsor[] = [];

export const faqs: FAQ[] = [
  { question: "When and where is Techkriti?", answer: "Techkriti is scheduled for 16–17 October 2026 at Mahatma Gandhi Institute of Technology (MGIT), Hyderabad." },
  { question: "What events are happening?", answer: "The confirmed lineup currently includes five technical events and six non-technical events. Open an event card for its latest published information." },
  { question: "How do I register for an event?", answer: "Each event will link directly to its official Google Form when registration opens. If an event does not show a registration button yet, its form has not been published on this website." },
  { question: "Can I participate in more than one event?", answer: "Participation limits and schedule conflicts have not yet been confirmed. Check the final timings and the rules on each event page before registering for multiple events." },
  { question: "Who can enter, and are there team or fee requirements?", answer: "Eligibility, team sizes, and any entry fees may differ by event. Confirmed requirements will appear with each event before its registration link is published." },
  { question: "When and where will each event take place?", answer: "The festival dates and MGIT campus are confirmed. Individual times and exact rooms are still pending and will appear with each event once approved." }
];

export const announcements: Announcement[] = [];

export const divisions = ["Technical", "Non-Technical"] as const;
export const eventCategories = ["Event", "Competition", "Workshop", "Talk", "Showcase"] as const;
