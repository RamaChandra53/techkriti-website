import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container } from "./container";
import { siteConfig } from "@/lib/content";

const people = [
  { name: "Numair Khan" },
  { name: "Rama Chandra" },
] as const;

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
        {people.map((person) => <div key={person.name} className="socials-person">
          <span className="socials-name">{person.name}</span>
          <span className="socials-title">Second year · CSB</span>
        </div>)}
      </div>
    </Container>
  </section>;
}
