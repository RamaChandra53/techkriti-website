import fs from "node:fs";

const file = fs.readFileSync(new URL("../lib/content.ts", import.meta.url), "utf8");
const placeholderPattern = /\[(FEST NAME|INSTITUTION|CITY|DATES|YEAR|TITLE PARTNER|TECHNOLOGY PARTNER|ECOSYSTEM PARTNER|MEDIA PARTNER)\]|example\.com|00000 00000/g;
const matches = [...new Set(file.match(placeholderPattern) ?? [])];
const formUrls = [...file.matchAll(/registrationUrl:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const invalidForms = formUrls.filter((value) => {
  try {
    const host = new URL(value).hostname;
    return host !== "forms.gle" && !(host === "docs.google.com" && new URL(value).pathname.startsWith("/forms/"));
  } catch {
    return true;
  }
});
const isProduction = process.env.VERCEL_ENV === "production" || process.env.CONTENT_STRICT === "true";

if ((matches.length || invalidForms.length) && isProduction) {
  console.error(`Production content validation failed. ${[matches.length ? `Replace: ${matches.join(", ")}` : "", invalidForms.length ? `Use direct Google Forms registration URLs: ${invalidForms.join(", ")}` : ""].filter(Boolean).join(" ")}`);
  process.exit(1);
}

if (matches.length) console.warn(`Content placeholders remain (allowed outside production): ${matches.join(", ")}`);
if (invalidForms.length) console.warn(`Non-Google registration links found: ${invalidForms.join(", ")}`);
if (!matches.length && !invalidForms.length) console.log("Content validation passed.");
