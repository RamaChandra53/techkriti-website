import { Container } from "./container";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="section-glow relative isolate overflow-hidden border-b border-[#453444] py-16 text-[#fff4e9] sm:py-24"><div className="section-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" /><Container className="relative"><p className="eyebrow">{eyebrow}</p><h1 className="display-heading mt-5 max-w-6xl font-display text-[clamp(3rem,7vw,6.5rem)]">{title}</h1><p className="muted-copy mt-7 max-w-2xl text-lg sm:text-xl">{copy}</p></Container></section>;
}
