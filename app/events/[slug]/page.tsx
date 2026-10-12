import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/event-detail-view";
import { events, siteConfig } from "@/lib/content";

export function generateStaticParams() { return events.map((event) => ({ slug: event.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  return event ? {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/events/${slug}` },
    openGraph: { title: `${event.title} · Techkriti`, description: event.summary, images: event.image ? [{ url: event.image.src, width: event.image.width, height: event.image.height, alt: event.image.alt }] : undefined },
  } : {};
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  const eventUrl = `${siteConfig.url}/events/${event.slug}`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Event", name: event.title, description: event.summary,
    startDate: "2026-10-16", endDate: "2026-10-17", eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: event.image ? [`${siteConfig.url}${event.image.src}`] : undefined,
    location: { "@type": "Place", name: `${event.venue}, MGIT`, address: { "@type": "PostalAddress", addressLocality: siteConfig.city, addressCountry: "IN" } },
    organizer: { "@type": "Organization", name: siteConfig.institution, url: siteConfig.url },
    offers: event.fees.map((fee) => ({ "@type": "Offer", name: fee.label, price: fee.amount, priceCurrency: "INR", url: eventUrl, availability: "https://schema.org/PreOrder" })),
    url: eventUrl,
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <EventDetailView event={event} />
  </>;
}
