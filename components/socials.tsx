import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container } from "./container";
import { siteConfig } from "@/lib/content";

const people = [
  { id: "numair", name: "Numair Khan", linkedin: "https://www.linkedin.com/in/numair-khan-13899b382/", portrait: "/team/numair-khan.png" },
  { id: "rama", name: "Rama Chandra", linkedin: "https://www.linkedin.com/in/ramachandravidapu/", portrait: "/team/rama-chandra.png" },
] as const;

function GoldDiamond({ id }: { id: string }) {
  return <svg className="socials-diamond" viewBox="0 0 48 48" aria-hidden="true">
    <defs>
      <linearGradient id={`socials-diamond-gold-${id}`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#fff1b3" />
        <stop offset=".28" stopColor="#d79938" />
        <stop offset=".56" stopColor="#ffe6a0" />
        <stop offset="1" stopColor="#9b5520" />
      </linearGradient>
    </defs>
    <path d="M24 2 46 24 24 46 2 24Z" fill={`url(#socials-diamond-gold-${id})`} stroke="#4b260e" strokeWidth="1.5" />
    <path d="M24 7 41 24 24 41 7 24Z" fill="#7a3e1e" stroke="#fff1ae" strokeWidth="1" />
    <path d="M24 7 41 24 24 24Z" fill="#ffe9a6" />
    <path d="M24 7 24 24 7 24Z" fill="#c78a32" />
    <path d="M7 24 24 24 24 41Z" fill="#a85d24" />
    <path d="M24 24 41 24 24 41Z" fill="#db9e45" />
  </svg>;
}

export function Socials() {
  return <section id="socials" aria-labelledby="socials-title" className="festival-section socials-section scroll-mt-24">
    <Container className="max-w-5xl">
      <div className="socials-heading">
        <p className="eyebrow">Find us beyond the festival</p>
        <h2 id="socials-title" className="display-heading mt-3 text-[clamp(2.8rem,6vw,5.5rem)]">Socials<span className="text-[var(--ember)]">.</span></h2>
        <a className="socials-instagram mt-6" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          <span>Follow @techkriti26_csb</span>
          <ArrowUpRightIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <p className="socials-credit-intro">Made with love by</p>
      </div>

      <div className="socials-people">
        {people.map((person) => <a key={person.name} className="socials-person" href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn (opens in a new tab)`}>
          <span className="socials-portrait-wrap">
            <span className="socials-portrait">
              <Image src={person.portrait} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 640px) 132px, 176px" className="socials-portrait-image" />
            </span>
            <GoldDiamond id={person.id} />
          </span>
          <span className="socials-name">{person.name}</span>
          <span className="socials-title">Second year · CSB</span>
          <span className="socials-link">LinkedIn <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></span>
        </a>)}
      </div>
    </Container>
  </section>;
}
