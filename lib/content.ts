import type { Announcement, Event, FAQ, ScheduleItem, SiteConfig, Sponsor } from "./types";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const siteConfig: SiteConfig = {
  name: "Techriti",
  shortName: "TECHRITI",
  institution: "Mahatma Gandhi Institute of Technology · Department of IT / CSBS",
  city: "Hyderabad",
  dates: "16–17 October 2026",
  year: "2026",
  tagline: "A Halloween-themed festival at MGIT.",
  description: "Techriti brings technical and non-technical experiences together at MGIT on 16–17 October 2026. The event lineup is being prepared.",
  email: "",
  phone: "",
  url: publicSiteUrl,
  bannerVideoUrl: "",
  previousBannerVideoUrl: "",
  previousBannerPosterUrl: "",
  social: { instagram: "" }
};

// Add confirmed events here. Never publish a made-up event, location, time, or form link.
export const events: Event[] = [];

export const schedule: ScheduleItem[] = [];

export const sponsors: Sponsor[] = [];

export const faqs: FAQ[] = [
  { question: "When and where is Techriti?", answer: "Techriti is scheduled for 16–17 October 2026 at Mahatma Gandhi Institute of Technology (MGIT), Hyderabad." },
  { question: "What events are happening?", answer: "Technical and non-technical event details are still being confirmed. The website will be updated when the organizers finalize the names and rules." },
  { question: "How do I register?", answer: "Each event will have a Register Now button that opens its official Google Form. Registration links will appear after the forms are ready." },
  { question: "Where inside MGIT will events take place?", answer: "The campus rooms and venues are still being assigned. Confirmed room details will be listed with each event." },
  { question: "Where can I follow updates?", answer: "The Instagram link will be added here once the official page URL is confirmed." }
];

export const announcements: Announcement[] = [];

export const divisions = ["Technical", "Non-Technical"] as const;
export const eventCategories = ["Competition", "Workshop", "Talk", "Showcase"] as const;
