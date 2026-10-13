import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import type { Event } from "@/lib/types";
import { Container } from "./container";
import { EventShareButton } from "./event-share-button";

function RegistrationAction({ event }: { event: Event }) {
  if (!event.registrationUrl) return <span aria-disabled="true" className="event-register-disabled">Registration soon</span>;
  return <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="event-register-action"><TicketIcon className="h-5 w-5" aria-hidden="true" /> {event.registrationLabel ?? "Register"} <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> for {event.title}, opens in a new tab</span></a>;
}

function Fact({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return <div className="event-fact"><dt>{icon}<span>{label}</span></dt><dd>{children}</dd></div>;
}

export function EventDetailView({ event }: { event: Event }) {
  const lowestFee = Math.min(...event.fees.map((fee) => fee.amount));
  const date = event.day === 1 ? "16 Oct 2026" : event.day === 2 ? "17 Oct 2026" : "16–17 Oct 2026";

  return <div className="event-detail-page">
    <Container className="event-detail-container">
      <div className="event-detail-actions">
        <Link href="/#discover" className="event-back"><ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />Back to events</Link>
        <EventShareButton title={event.title} />
      </div>

      {event.image && <figure className={`event-poster-frame ${event.image.height && event.image.width && event.image.height > event.image.width ? "event-poster-portrait" : "event-poster-landscape"}`}><Image src={event.image.src} alt={event.image.alt} fill priority sizes="(max-width: 720px) calc(100vw - 3rem), 760px" className="event-poster-image" /></figure>}

      <section className="event-detail-panel event-info-panel" aria-labelledby="event-title">
        <h1 id="event-title">{event.title}</h1>
        <p className="event-organizer">Techkriti <span>· MGIT</span></p>
        <p className="event-category">{event.division} · {event.category}</p>
        <dl className="event-facts">
          <Fact icon={<CalendarDaysIcon aria-hidden="true" />} label="Date">{date}</Fact>
          <Fact icon={<ClockIcon aria-hidden="true" />} label="Time">{event.time ?? "To be announced"}</Fact>
          <Fact icon={<UserGroupIcon aria-hidden="true" />} label="Format">{event.teamSize}</Fact>
          <Fact icon={<MapPinIcon aria-hidden="true" />} label="Location">{event.venue}</Fact>
        </dl>
      </section>

      <section className="event-detail-panel event-about-panel" aria-labelledby="about-event">
        <h2 id="about-event">About this event</h2>
        <p className="event-about-summary">{event.summary}</p>
        <ul>{event.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
        <p className="event-about-note">Exact event time and eligibility will be published when confirmed.</p>
      </section>

      <section className="event-detail-panel event-tickets-panel" aria-labelledby="event-tickets">
        <h2 id="event-tickets"><TicketIcon aria-hidden="true" /> Tickets</h2>
        <div className="event-ticket-list">{event.fees.map((fee) => <article key={fee.label} className="event-fee-card"><h3>{fee.label}</h3><p className="event-ticket-type">Event pass</p><p className="event-price-label">Price</p><p className="event-ticket-price">₹{fee.amount}</p></article>)}</div>
      </section>

      <section className="event-detail-panel event-venue-panel" aria-labelledby="event-venue">
        <h2 id="event-venue">Venue</h2>
        <div className="event-venue-content"><span className="event-venue-icon"><MapPinIcon aria-hidden="true" /></span><div><p className="event-venue-name">{event.venue}</p><p>Mahatma Gandhi Institute of Technology, Hyderabad</p></div></div>
      </section>
    </Container>

    <div className="event-registration-bar"><div className="event-registration-inner"><div><p className="event-starts-label">Starts from</p><p className="event-starts-price">₹{lowestFee}</p></div><RegistrationAction event={event} /></div></div>
  </div>;
}
