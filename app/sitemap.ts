import type { MetadataRoute } from "next";
import { events, siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap { const routes = ["", "/events", "/schedule", "/gallery", "/about", "/sponsors", "/faq", "/contact"]; return [...routes.map((route) => ({ url: `${siteConfig.url}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : .8 })), ...events.map((event) => ({ url: `${siteConfig.url}/events/${event.slug}`, changeFrequency: "weekly" as const, priority: .7 }))]; }
