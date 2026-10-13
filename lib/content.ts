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
  bannerVideoUrl: "",
  previousBannerVideoUrl: "/branding/revelation.mp4",
  previousBannerPosterUrl: "",
  social: { instagram: "" }
};

export const contactGroups: { title: string; people: { name: string; detail?: string; phone?: string }[] }[] = [
  { title: "Faculty Convenor", people: [{ name: "Dr. D. Vijaya Lakshmi", detail: "Professor & HOD, IT" }] },
  { title: "Faculty Co-Convenors", people: [{ name: "Mrs. B. Tulasi Das" }, { name: "Mrs. J. Padmavathi" }] },
  { title: "Student Convenors", people: [{ name: "T. Shashank", phone: "7013686848" }, { name: "P. Akshaya", phone: "9573890107" }] },
  { title: "Student Co-Convenors", people: [{ name: "P. Aditya", phone: "8919268734" }, { name: "M. Vyshnavi", phone: "7671863390" }] }
];

export const events: Event[] = [
  {
    slug: "brand-o-ween", title: "Brand-O-Ween", eyebrow: "Technical event", division: "Technical", category: "Competition", accent: "coral",
    summary: "A Halloween branding challenge built around ideas, identities, and loyal audiences.", description: "Poster-confirmed event highlights.",
    venue: "D 208", eligibility: "To be announced", teamSize: "Individual", fees: [{ label: "Single", amount: 49 }],
    highlights: ["Halloween branding challenge", "Ideas, identities, and a loyal audience", "Exciting prizes"], coordinators: [{ name: "Adarsh", phone: "+91 83286 91910" }],
    image: { src: "/events/brand-o-ween.webp", alt: "Official Brand-O-Ween event poster", width: 1684, height: 2382 }, featured: true,
  },
  {
    slug: "treasure-hunt-exe", title: "Treasure Hunt.exe", eyebrow: "Technical event", division: "Technical", category: "Competition", accent: "acid",
    summary: "A clue-solving treasure hunt through D-Block.", description: "Poster-confirmed event highlights.",
    venue: "D-Block Entrance", eligibility: "To be announced", teamSize: "Single, duo, or squad", fees: [{ label: "Single", amount: 49 }, { label: "Duo", amount: 79 }, { label: "Squad", amount: 99 }],
    highlights: ["Crack the clues", "Unlock the prizes", "Single, duo, and squad entry options"], coordinators: [{ name: "T. Shashank", phone: "+91 70136 86848" }],
    image: { src: "/events/treasure-hunt-exe.webp", alt: "Official Treasure Hunt.exe event poster", width: 1684, height: 2382 }, featured: true,
  },
  {
    slug: "corpse-to-corporation", title: "Corpse to Corporation", eyebrow: "Technical event", division: "Technical", category: "Competition", accent: "electric",
    summary: "A business revival challenge about bringing a dead business back to life.", description: "Poster-confirmed event highlights.",
    venue: "D 209", eligibility: "To be announced", teamSize: "Team size to be announced", fees: [{ label: "Team", amount: 99 }],
    highlights: ["The business revival challenge", "Build a strategy to revive a dead business", "Win rewards"], coordinators: [{ name: "Adarsh", phone: "+91 83286 91910" }],
    image: { src: "/events/corpse-to-corporation.webp", alt: "Official Corpse to Corporation event poster", width: 2382, height: 1684 }, featured: true,
  },
  {
    slug: "poster-presentation", title: "Poster Presentation", eyebrow: "Technical event", division: "Technical", category: "Showcase", accent: "coral",
    summary: "A showcase of ideas beyond the ordinary.", description: "Poster-confirmed event highlights.",
    venue: "D 208", eligibility: "To be announced", teamSize: "Single or duo", fees: [{ label: "Single", amount: 49 }, { label: "Duo", amount: 99 }],
    highlights: ["Create and captivate", "Showcase ideas beyond the ordinary", "Exciting prizes"], coordinators: [{ name: "M Vyshnavi", phone: "+91 76718 63390" }],
    image: { src: "/events/poster-presentation.webp", alt: "Official Poster Presentation event poster", width: 1684, height: 2382 },
  },
  {
    slug: "esports", title: "Esports", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "sky",
    summary: "Valorant, BGMI, and CODM tournaments with team and solo categories.", description: "Poster-confirmed event highlights.",
    venue: "COD2 Lab", eligibility: "To be announced", teamSize: "Team and solo categories", fees: [{ label: "Valorant squad", amount: 499 }, { label: "BGMI squad", amount: 250 }, { label: "CODM", amount: 199 }],
    highlights: ["Valorant tournament", "BGMI tournament", "CODM tournament", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Swayam", phone: "+91 8317536981" }, { name: "Pranav", phone: "+91 8309513259" }],
    image: { src: "/events/esports.webp", alt: "Official Esports event poster", width: 2382, height: 1684 },
  },
  {
    slug: "vr-gaming", title: "VR Gaming", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "coral",
    summary: "An immersive virtual-reality gaming challenge with team and solo categories.", description: "Poster-confirmed event highlights.",
    venue: "D-Block Entrance", eligibility: "To be announced", teamSize: "Team and solo categories", fees: [{ label: "Single", amount: 99 }],
    highlights: ["Immersive VR experience", "Team and solo categories", "Thrilling game modes", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Harmith", phone: "+91 74169 63124" }],
    image: { src: "/events/vr-gaming.webp", alt: "Official VR Gaming event poster", width: 2382, height: 1684 },
  },
  {
    slug: "mummy-wrap", title: "Mummy Wrap", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "acid",
    summary: "A fast, creative team wrapping challenge against the clock.", description: "Poster-confirmed event highlights.",
    venue: "D-Block Entrance", eligibility: "To be announced", teamSize: "3–5 members", fees: [{ label: "Team", amount: 99 }],
    highlights: ["Team event for 3–5 members", "Fun and creative challenge", "Race against time", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Lohith", phone: "+91 73374 25222" }],
    image: { src: "/events/mummy-wrap.webp", alt: "Official Mummy Wrap event poster", width: 2382, height: 1684 },
  },
  {
    slug: "ipl-auction", title: "IPL Auction", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "electric",
    summary: "A live auction simulation focused on team building and bidding strategy.", description: "Poster-confirmed event highlights.",
    venue: "E 501", eligibility: "To be announced", teamSize: "Team size to be announced", fees: [{ label: "Team", amount: 199 }],
    highlights: ["Live auction simulation", "Team building and strategy", "Analysis and bidding strategies", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Sujith", phone: "+91 9121427854" }],
    image: { src: "/events/ipl-auction.webp", alt: "Official IPL Auction event poster", width: 2382, height: 1684 },
  },
  {
    slug: "period-cramps", title: "Period Cramps", eyebrow: "Non-technical event", division: "Non-Technical", category: "Talk", accent: "coral",
    summary: "An awareness event for open conversations, practical wellness, and campus support.", description: "Poster-confirmed event highlights.",
    venue: "Stationery Shop", eligibility: "To be announced", teamSize: "Individual", fees: [{ label: "Single", amount: 49 }],
    highlights: ["Panel discussion and awareness", "Myths versus facts", "Health and wellness tips", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Raghavendra", phone: "+91 78425 48629" }],
    image: { src: "/events/period-cramps.webp", alt: "Official Period Cramps event poster", width: 2382, height: 1684 },
  },
];

export const schedule: ScheduleItem[] = [];

export const sponsors: Sponsor[] = [];

export const faqs: FAQ[] = [
  { question: "When and where is Techkriti?", answer: "Techkriti is scheduled for 16–17 October 2026 at Mahatma Gandhi Institute of Technology (MGIT), Hyderabad." },
  { question: "What events are happening?", answer: "The confirmed lineup includes four technical events and five non-technical events. Open an event card for its latest published information." },
  { question: "How do I register for an event?", answer: "Each event will link directly to its official Google Form when registration opens. If an event does not show a registration button yet, its form has not been published on this website." },
  { question: "Can I participate in more than one event?", answer: "Participation limits and schedule conflicts have not yet been confirmed. Check the final timings and the rules on each event page before registering for multiple events." },
  { question: "Who can enter, and are there team or fee requirements?", answer: "Eligibility, team sizes, and any entry fees may differ by event. Confirmed requirements will appear with each event before its registration link is published." },
  { question: "When and where will each event take place?", answer: "The festival dates and MGIT campus are confirmed. Individual times and exact rooms are still pending and will appear with each event once approved." }
];

export const announcements: Announcement[] = [];

export const divisions = ["Technical", "Non-Technical"] as const;
export const eventCategories = ["Event", "Competition", "Workshop", "Talk", "Showcase"] as const;
