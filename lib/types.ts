export type EventDivision = "Technical" | "Non-Technical";
export type EventCategory = "Event" | "Competition" | "Workshop" | "Talk" | "Showcase";
export type FestDay = 1 | 2;

export interface SiteConfig {
  name: string;
  shortName: string;
  institution: string;
  city: string;
  dates: string;
  year: string;
  tagline: string;
  description: string;
  email?: string;
  phone?: string;
  url: string;
  bannerVideoUrl?: string;
  previousBannerVideoUrl?: string;
  previousBannerPosterUrl?: string;
  social: { instagram?: string; linkedin?: string; youtube?: string };
}

export interface Event {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  division: EventDivision;
  category: EventCategory;
  day?: FestDay;
  time?: string;
  venue: string;
  eligibility: string;
  teamSize: string;
  rulesUrl?: string;
  rules?: string[];
  prizes?: string;
  registrationUrl?: string;
  /** Optimized, organizer-approved artwork under public/, e.g. /events/poster.webp. */
  image?: { src: string; alt: string };
  featured?: boolean;
  accent: "electric" | "coral" | "sky" | "acid";
}

export interface ScheduleItem {
  id: string;
  day: FestDay;
  time: string;
  title: string;
  venue: string;
  category: EventCategory | "Festival";
  eventSlug?: string;
}

export interface Sponsor { name: string; tier: "Title" | "Powered by" | "Partner"; url?: string }
export interface FAQ { question: string; answer: string }
export interface Announcement { id: string; date: string; title: string; body: string }
