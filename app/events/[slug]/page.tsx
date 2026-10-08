import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/event-detail-view";
import { events, siteConfig } from "@/lib/content";

export function generateStaticParams() { return events.map((event) => ({ slug: event.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const event = events.find((item) => item.slug === slug); return event ? { title: event.title, description: event.summary, alternates: { canonical: `/events/${slug}` } } : {}; }

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Event", name: event.title, description: event.summary, location: { "@type": "Place", name: event.venue, address: siteConfig.city }, organizer: { "@type": "Organization", name: siteConfig.institution, url: siteConfig.url }, eventStatus: "https://schema.org/EventScheduled", url: `${siteConfig.url}/events/${event.slug}` };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <EventDetailView event={event} />
  </>;
}
