import type { Event } from "../lib/types";

// Synthetic test data only. This file is never imported by app/ or lib/content.ts.
export const fixtureEvents: Event[] = Array.from({ length: 4 }, (_, index) => ({
  slug: `test-only-${index + 1}`,
  title: `Test fixture ${index + 1}`,
  eyebrow: "Automated test only",
  summary: "Synthetic content used only to exercise event components.",
  description: "This is isolated test content, not a confirmed Techkriti event.",
  division: index === 3 ? "Non-Technical" : "Technical",
  category: "Competition",
  day: index === 1 ? 2 : 1,
  time: "Test time",
  venue: "Test room",
  eligibility: "Test eligibility",
  teamSize: "Test team",
  rules: ["Test rule one", "Test rule two", "Test rule three", "Test rule four", "Test rule five"],
  registrationUrl: index === 0 ? "https://forms.gle/test-only-do-not-register" : undefined,
  accent: "coral",
}));
