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
  description: "Techkriti brings technical and non-technical events together at MGIT on 16–17 October 2026. Open an event poster for details and its registration link.",
  email: "",
  phone: "",
  url: publicSiteUrl,
  bannerVideoUrl: "/branding/revelation.mp4",
  bannerPosterUrl: "/branding/revelation-poster.png",
  social: { instagram: "https://www.instagram.com/techkriti26_csb/?hl=en" }
};

export const contactGroups: { title: string; people: { name: string; detail?: string; phone?: string }[] }[] = [
  { title: "Faculty Convenor", people: [{ name: "Dr. D. Vijaya Lakshmi", detail: "Professor & HOD, IT" }] },
  { title: "Faculty Co-Convenors", people: [{ name: "Mr. B. Tulasi Dasu", detail: "Assistant Professor, Dept of IT" }, { name: "Mrs. J. Padmavathi", detail: "Assistant Professor, Dept of IT" }] },
  { title: "Student Convenors", people: [{ name: "T. Shashank", phone: "7013686848" }, { name: "P. Akshaya", phone: "9573890107" }] },
  { title: "Student Co-Convenors", people: [{ name: "P. Aditya", phone: "8919268734" }, { name: "M. Vyshnavi", phone: "7671863390" }] }
];

export const events: Event[] = [
  {
    slug: "brand-o-ween", title: "Brand-O-Ween", eyebrow: "Technical event", division: "Technical", category: "Competition", accent: "coral",
    summary: "A Halloween branding challenge built around ideas, identities, and loyal audiences.", description: "Poster-confirmed event highlights.",
    venue: "D-208", eligibility: "To be announced", teamSize: "Individual", fees: [{ label: "Single", amount: 49 }], registrationUrl: "https://forms.gle/fjsTTqf2bLV7NEGD9",
    highlights: ["Halloween branding challenge", "Ideas, identities, and a loyal audience", "Exciting prizes"], coordinators: [{ name: "Adarsh", phone: "+91 83286 91910" }],
    image: { src: "/events/brand-o-ween.webp", alt: "Official Brand-O-Ween event poster", width: 1684, height: 2382 }, featured: true,
  },
  {
    slug: "treasure-hunt-exe", title: "Treasure Hunt.exe", eyebrow: "Technical event", division: "Technical", category: "Competition", accent: "acid",
    summary: "A clue-solving treasure hunt through D-Block.", description: "Poster-confirmed event highlights.",
    venue: "D-Block Entrance", eligibility: "To be announced", teamSize: "Single, duo, or squad", fees: [{ label: "Single", amount: 49 }, { label: "Duo", amount: 79 }, { label: "Squad", amount: 99 }], registrationUrl: "https://forms.gle/o8E4RUkXh2N4EsE38",
    highlights: ["Crack the clues", "Unlock the prizes", "Single, duo, and squad entry options"], coordinators: [{ name: "T. Shashank", phone: "+91 70136 86848" }],
    image: { src: "/events/treasure-hunt-exe.webp", alt: "Official Treasure Hunt.exe event poster", width: 1684, height: 2382 }, featured: true,
  },
  {
    slug: "corpse-to-corporation", title: "Corpse to Corporation", eyebrow: "Technical event", division: "Technical", category: "Competition", accent: "electric",
    summary: "A business revival challenge about bringing a dead business back to life.", description: "Poster-confirmed event highlights.",
    venue: "D-209", eligibility: "To be announced", teamSize: "Team size to be announced", fees: [{ label: "Team", amount: 99 }], registrationUrl: "https://forms.gle/vUKs46KuLsgwhgH89",
    highlights: ["The business revival challenge", "Build a strategy to revive a dead business", "Win rewards"], coordinators: [{ name: "Adarsh", phone: "+91 83286 91910" }],
    image: { src: "/events/corpse-to-corporation.webp", alt: "Official Corpse to Corporation event poster", width: 2382, height: 1684 }, featured: true,
  },
  {
    slug: "poster-presentation", title: "Poster Presentation", eyebrow: "Technical event", division: "Technical", category: "Showcase", accent: "coral",
    summary: "A showcase of ideas beyond the ordinary.", description: "Poster-confirmed event highlights.",
    venue: "D-208", eligibility: "To be announced", teamSize: "Single or duo", fees: [{ label: "Single", amount: 49 }, { label: "Duo", amount: 99 }], registrationUrl: "https://forms.gle/XgZzAu5UxpUWtHA99",
    highlights: ["Create and captivate", "Showcase ideas beyond the ordinary", "Exciting prizes"], coordinators: [{ name: "M Vyshnavi", phone: "+91 76718 63390" }],
    image: { src: "/events/poster-presentation.webp", alt: "Official Poster Presentation event poster", width: 1684, height: 2382 },
  },
  {
    slug: "esports", title: "Esports", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "sky",
    summary: "Valorant, BGMI, and CODM tournaments with team and solo categories.", description: "Poster-confirmed event highlights.",
    venue: "C-OO2 Lab", eligibility: "To be announced", teamSize: "Team and solo categories", fees: [{ label: "Valorant squad", amount: 499 }, { label: "BGMI squad", amount: 250 }, { label: "CODM", amount: 199 }], registrationUrl: "https://forms.gle/AGHRFEMtZRUkX46b7",
    highlights: ["Valorant tournament", "BGMI tournament", "CODM tournament", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Swayam", phone: "+91 8317536981" }, { name: "Pranav", phone: "+91 8309513259" }],
    image: { src: "/events/esports.webp", alt: "Official Esports event poster", width: 2382, height: 1684 },
  },
  {
    slug: "vr-gaming", title: "VR Gaming", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "coral",
    summary: "An immersive virtual-reality gaming challenge with team and solo categories.", description: "Poster-confirmed event highlights.",
    venue: "D-Block Entrance", eligibility: "To be announced", teamSize: "Team and solo categories", fees: [{ label: "Single", amount: 99 }], registrationUrl: "https://forms.gle/nDC9saGtbGe8J5Ac6",
    highlights: ["Immersive VR experience", "Team and solo categories", "Thrilling game modes", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Harmith", phone: "+91 74169 63124" }],
    image: { src: "/events/vr-gaming.webp", alt: "Official VR Gaming event poster", width: 2382, height: 1684 },
  },
  {
    slug: "mummy-wrap", title: "Mummy Wrap", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "acid",
    summary: "A fast, creative team wrapping challenge against the clock.", description: "Poster-confirmed event highlights.",
    venue: "D-Block Entrance", eligibility: "To be announced", teamSize: "3–5 members", fees: [{ label: "Team", amount: 99 }], registrationUrl: "https://forms.gle/GT6bgQKNCuyeMJsJA",
    highlights: ["Team event for 3–5 members", "Fun and creative challenge", "Race against time", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Lohith", phone: "+91 73374 25222" }],
    image: { src: "/events/mummy-wrap.webp", alt: "Official Mummy Wrap event poster", width: 2382, height: 1684 },
  },
  {
    slug: "ipl-auction", title: "IPL Auction", eyebrow: "Non-technical event", division: "Non-Technical", category: "Competition", accent: "electric",
    summary: "A live auction simulation focused on team building and bidding strategy.", description: "Poster-confirmed event highlights.",
    venue: "E-501", eligibility: "To be announced", teamSize: "Team size to be announced", fees: [{ label: "Team", amount: 199 }], registrationUrl: "https://forms.gle/Sd5MZdJXpwZfTRcK9",
    highlights: ["Live auction simulation", "Team building and strategy", "Analysis and bidding strategies", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Sujith", phone: "+91 9121427854" }],
    image: { src: "/events/ipl-auction.webp", alt: "Official IPL Auction event poster", width: 2382, height: 1684 },
  },
  {
    slug: "period-cramps", title: "Period Cramps", eyebrow: "Non-technical event", division: "Non-Technical", category: "Talk", accent: "coral",
    summary: "An awareness event for open conversations, practical wellness, and campus support.", description: "Poster-confirmed event highlights.",
    venue: "Stationery Shop", eligibility: "To be announced", teamSize: "Individual", fees: [{ label: "Single", amount: 49 }], registrationUrl: "https://forms.gle/DSHmCoDnY9MpYTt27",
    highlights: ["Panel discussion and awareness", "Myths versus facts", "Health and wellness tips", "Rules briefed on site", "Exciting prizes"], coordinators: [{ name: "Raghavendra", phone: "+91 78425 48629" }],
    image: { src: "/events/period-cramps.webp", alt: "Official Period Cramps event poster", width: 2382, height: 1684 },
  },
];

export const schedule: ScheduleItem[] = [];

export const sponsors: Sponsor[] = [
  { name: "Global Degrees", tier: "Partner", logo: { src: "/sponsors/global-degrees.png", alt: "Global Degrees Education & More logo", width: 216, height: 126 } },
  { name: "Vionet", tier: "Partner", logo: { src: "/sponsors/vionet.png", alt: "Vionet logo", width: 329, height: 64 } },
  { name: "Jai Enterprises", tier: "Partner", logo: { src: "/sponsors/jai-enterprises.png", alt: "Jai Enterprises logo", width: 138, height: 140 } },
  { name: "Spring Soft Solutions & Consultants", tier: "Partner", logo: { src: "/sponsors/spring-soft-solutions-and-consultants.jpeg", alt: "Spring Soft Solutions & Consultants logo", width: 792, height: 455 } },
  { name: "Bharathiya", tier: "Partner", logo: { src: "/sponsors/bharathiya.jpeg", alt: "Bharathiya logo in Telugu and English", width: 1600, height: 534 } }
];

export const faqs: FAQ[] = [
  { question: "When and where this nightmare begin?", answer: "16–17 October 2026 at MGIT, Hyderabad. Two days. Nine events. Endless chaos." },
  { question: "Who can enter? Only ghosts?", answer: "Vampires, witches, and humans are welcome. Students from other colleges can join the haunting too." },
  { question: "How do I secure my place in the underworld?", answer: "Explore the events, choose your challenge, and fill out its registration form." },
  { question: "Can I participate in multiple events?", answer: "Yes, take on as many challenges as you like. Check the event timings so your choices do not clash." },
  { question: "Are there any prizes?", answer: "Check each event’s details for prize information." },
  { question: "What should I bring?", answer: "Your college ID, your soul, and a little courage. Garlic is optional." }
];

export const announcements: Announcement[] = [];

export const divisions = ["Technical", "Non-Technical"] as const;
export const eventCategories = ["Event", "Competition", "Workshop", "Talk", "Showcase"] as const;
