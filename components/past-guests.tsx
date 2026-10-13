import Image from "next/image";
import { ArrowUpRightIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Container } from "./container";

const guests = [
  { name: "Adivi Sesh", image: "/guests/adivi-sesh.webp", href: "https://www.instagram.com/p/DUmvBX6kUSO/" },
  { name: "Sai Dharam Tej", image: "/guests/sai-dharam-tej.webp", href: "https://www.instagram.com/p/DUktPvZkRVH/" },
];

function GraveWeb() {
  return <svg className="guest-cobweb" viewBox="0 0 180 200" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth=".9">
      <path d="M180 0 0 0M180 0 0 50M180 0 18 106M180 0 65 154M180 0 124 178M180 0v158" />
      <path d="M143 0q3 7 1 10 0 10 4 12 4 8 9 10 8 4 12 3 6 2 11-1M108 0q2 12 2 19 1 15 12 19 5 14 17 18 10 9 21 5 13 4 20-1M70 0q8 17 5 29 5 20 21 26 8 18 22 29 14 10 29 6 19 9 33 0M32 0q5 26 8 39 7 27 28 36 8 28 28 42 19 8 33 10 27 12 51-1M0 0q7 32 0 50 10 31 18 56 33 12 47 48 31 1 59 24 28-10 56-20" />
      <path d="M150 105v62" />
    </g>
    <g fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <ellipse cx="150" cy="172" rx="4" ry="6" /><circle cx="150" cy="166" r="2.5" />
      <path d="m147 168-7-4-3 4m10 3-9 0-3 5m12-1-7 5 0 4m13-16 7-4 3 4m-10 3 9 0 3 5m-12-1 7 5 0 4" fill="none" />
    </g>
  </svg>;
}

export function PastGuests() {
  return <section id="past-guests" aria-labelledby="past-guests-title" className="past-guests-section scroll-mt-24">
    <Container>
      <h2 id="past-guests-title" className="past-guests-title">Ghosts spread <span>the word.</span></h2>
      <p className="past-guests-context">Ghosts are alive. Their 2026 Techkriti memories still haunt us.</p>
      <div className="past-guests-grid">
        {guests.map((guest) => <article key={guest.name} className="past-guest-card">
          <a className="guest-headstone" href={guest.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${guest.name} Instagram reel in a new tab`}>
            <GraveWeb />
            <svg className="guest-stone-cracks" viewBox="0 0 400 700" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="m108 3 15 35-18 20 12 29-27 32m15-61-24-9M395 390l-19 28 8 26-22 31 10 30m12-61 15 8M3 570l24 18-10 23 20 23-8 43m-2-89 27 1" /></svg>
            <span className="guest-stone-ornament" aria-hidden="true">✝</span>
            <div className="past-guest-portrait">
              <Image src={guest.image} alt={`${guest.name} portrait — open the Instagram reel`} fill sizes="(max-width: 600px) 70vw, 320px" className="guest-portrait-image" />
              <span className="guest-reel-cue"><PlayIcon aria-hidden="true" />Open the IG reel<ArrowUpRightIcon aria-hidden="true" /></span>
            </div>
            <h3>{guest.name}</h3>
            <p className="guest-epitaph">Haunted Techkriti · February 2026</p>
          </a>
          <div className="guest-stone-base" aria-hidden="true" />
          <div className="guest-earth-lip" aria-hidden="true" />
          <Image src="/guests/halloween-ground.png" alt="" width={1536} height={1024} sizes="240px" className="guest-ground-decor" aria-hidden="true" />
        </article>)}
      </div>
    </Container>
  </section>;
}
